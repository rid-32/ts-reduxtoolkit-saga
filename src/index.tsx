import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'core/store';

import Orders from 'ui/orders';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Orders />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
