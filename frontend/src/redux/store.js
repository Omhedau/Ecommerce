import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { productsReducer } from './reducers/product.js';
import { userReducer } from './reducers/user.js';
import { cartReducer } from './reducers/cart.js';

const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    cart: cartReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
