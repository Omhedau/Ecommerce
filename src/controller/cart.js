import Cart from '../models/cart.js';
import CartItem from '../models/cartItem.js';

const cartController = {
  getUserCart: async (userId) => {
    try {
      const cart = await Cart.findOne({ userId }).populate({
        path: 'items',
        populate: {
          path: 'productId',
          model: 'Product',
        },
      });
      return cart;
    } catch (error) {
      console.error('Error fetching user cart:', error);
      throw error;
    }
  },

  addItemToCart: async (userId, productId, size, quantity) => {
    try {
      let cart = await Cart.findOne({ userId }).populate('items');

      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      // Check if the item already exists in the cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId && item.size === size
      );

      if (existingItem) {
        // Update quantity of existing item
        existingItem.quantity += quantity;
      } else {
        // Add new item to cart
        const newItem = new CartItem({ productId, size, quantity });
        await newItem.save();
        cart.items.push(newItem);
      }

      // Calculate total price, total items, total discount
      cart.totalPrice = calculateTotalPrice(cart);
      cart.totalItems = calculateTotalItems(cart);
      cart.totalDiscount = calculateTotalDiscount(cart);

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  updateCartItem: async (cartItemId, quantity) => {
    try {
      const cartItem = await CartItem.findById(cartItemId);

      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      // Recalculate totals for the cart
      const cart = await Cart.findOne({ items: { $in: [cartItemId] } }).populate('items');
      if (cart) {
        cart.totalPrice = calculateTotalPrice(cart);
        cart.totalItems = calculateTotalItems(cart);
        cart.totalDiscount = calculateTotalDiscount(cart);
        await cart.save();
      }

      return cartItem;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  deleteCartItem: async (cartItemId) => {
    try {
      const cartItem = await CartItem.findById(cartItemId);

      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      const cart = await Cart.findOneAndUpdate(
        { items: { $in: [cartItemId] } },
        { $pull: { items: cartItemId } },
        { new: true }
      ).populate('items');

      if (cart) {
        cart.totalPrice = calculateTotalPrice(cart);
        cart.totalItems = calculateTotalItems(cart);
        cart.totalDiscount = calculateTotalDiscount(cart);
        await cart.save();
      }

      await cartItem.remove();
      return cart;
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error;
    }
  },
};

// Helper functions to calculate cart totals
const calculateTotalPrice = (cart) => {
  return cart.items.reduce((total, item) => {
    return total + item.quantity * item.productId.discountedPrice;
  }, 0);
};

const calculateTotalItems = (cart) => {
  return cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};

const calculateTotalDiscount = (cart) => {
  return cart.items.reduce((total, item) => {
    const discountPerItem = item.quantity * (item.productId.price - item.productId.discountedPrice);
    return total + discountPerItem;
  }, 0);
};

export default cartController;
