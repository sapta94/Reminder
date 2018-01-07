//import 'materialize-css/dist/css/materialize.min.css'
import React from "react";
import ReactDOM,{render} from "react-dom";
import Navbar from "./components/Navbar"
import App from "./components/App"
import reducers from './reducers'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'


const store = createStore(reducers,{},applyMiddleware(reduxThunk))
render(
<Provider store={store}><App /></Provider>,window.document.getElementById('root'));