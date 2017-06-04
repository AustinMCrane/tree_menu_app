import React from 'react';
import { View, Text, ListView } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Menu from './containers/Menu';
import MenuReducer from './containers/Menu/reducer';

const App = () => {
  const store = createStore(MenuReducer);
  return (
    <Provider store={store}>
      <Menu />
    </Provider>
  );
};

export default App;
