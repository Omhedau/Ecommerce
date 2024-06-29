import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
  });

  const Cart = mongoose.model('Cart', CartSchema);

  export {Cart};