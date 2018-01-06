import React from "react";
import ReactDOM,{render} from "react-dom";
import Navbar from "./components/Navbar"
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'

class App extends React.Component{
    render(){
        return (
            <div>
                <Navbar />
            </div>
        )
    }
}
const store = createStore(reducers,{})
render(
<Provider store={store}><App /></Provider>,window.document.getElementById('root'));