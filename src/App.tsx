import React from 'react';
import { Provider } from 'react-redux';
import { Button } from 'antd';
import './App.css';
import 'antd/dist/reset.css';
import Tree from './Tree';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Tree />
      </div>
    </Provider>
  );
}

export default App;
