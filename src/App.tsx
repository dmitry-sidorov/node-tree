import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import 'antd/dist/reset.css';
import { Modal, Tree } from './components';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Modal />
        <Tree />
      </div>
    </Provider>
  );
}

export default App;
