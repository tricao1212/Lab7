import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import store from './store/Store';
import MyStack from './navigations/MyStack';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <PaperProvider>
          <MyStack />
        </PaperProvider>
      </MenuProvider>
    </Provider>
  );
};

export default App;
