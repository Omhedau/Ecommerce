import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { productsReducer } from './reducers/product.js';
import { userReducer } from './reducers/user.js';
import { cartReducer } from './reducers/cart.js';
import { addressReducer } from './reducers/address.js';
import { orderReducer } from './reducers/order.js';
const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
