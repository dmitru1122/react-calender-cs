import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './root/Root';
import store from './redux/store/index';

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById('root'),
);
