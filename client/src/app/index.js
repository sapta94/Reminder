import React from "react";
import ReactDOM,{render} from "react-dom";
import Navbar from "./components/Navbar"
import App from "./components/App"
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'


const store = createStore(reducers,{})
render(
<Provider store={store}><App /></Provider>,window.document.getElementById('root'));