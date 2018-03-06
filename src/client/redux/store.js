import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import appStore from './reducers';
import initialStoreData from '../config/initialStoreData';

const middleware = [thunk];

const composeEnhancers =
typeof window !== undefined &&
typeof window === "object" &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      realtime: true,
      port: 8000
    })
  : compose;

const store = createStore(
  appStore,
  initialStoreData,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;