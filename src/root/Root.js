import React from 'react';
import { Provider } from 'react-redux';
import '../theme/main.scss';

import App from '../views/App';
import createLoacalStorage from '../fakeDb/connect';

const propType = {
  store: Provider.propTypes.store,
};
const defaultProp = {
  store: {},
};

function Root({ store }) {
  createLoacalStorage();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
Root.propTypes = propType;
Root.defaultProps = defaultProp;

export default Root;
