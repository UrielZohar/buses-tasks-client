import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import SpinnerReducer from './components/Spinner/SpinnerReducer';
import RootReducer from './reducers/RootReducer';

const rootReducer = combineReducers({
  'spinner': SpinnerReducer,
  'root': RootReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

