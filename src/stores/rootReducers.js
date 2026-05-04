
import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
import productReducer from './reducers/productReducer';
import sellerReducer from './reducers/sellerReducer';
import orderReducer from './reducers/orderReducer';
import chatReducer from './reducers/chatReducer';

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  seller: sellerReducer,
  order: orderReducer,
  chat: chatReducer,
}

export default rootReducer;