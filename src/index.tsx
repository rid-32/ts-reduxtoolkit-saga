import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'models/store';

import Orders from 'components/orders';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Orders />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
