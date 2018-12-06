import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import {createStore } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { configure, shallow } from 'enzyme';
// import { expect } from 'chai';
import './index.css';
import rosteredData from './datasample.js';
import store from './store';
// import apiTest from './api.js';
import App from './App';
import Header from './components/header';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

import $ from 'jquery';
import './stylesheets/App.css';

describe('sample test', () => {
  it('works as expected', () => {
    expect(1).toEqual(1);
  });
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Provider store={store}>
//     <App stats={rosteredData} />
//   </Provider>, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
//
// it('has header title', () => {
//   const wrapper = shallow(<Header />);
//   const title = <h1 className="App-title">Rostered</h1>;
//   expect(wrapper.find('h1').hasClass("App-title")).to.equal(true);
// });
