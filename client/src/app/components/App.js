import React,{Component} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'

import Navbar from './Navbar'
import Login from './Login'
import Landing from './Landing'
import Register from './Register'
//import SurveyNew from './Surveys/SurveyNew'
import Dashboard from './Dashboard'
import Notification from './Notification'

class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
        return(
            <div className="container">
            <BrowserRouter>
                    <div>
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/reminders" component={Dashboard} />
                        <Route exact path="/reminder/new" component={Notification} />
                        <Route exact path="/register" component={Register} />
                    </div>
            </BrowserRouter>
            </div>
        )
    }
}

export default connect (null,actions)(App);