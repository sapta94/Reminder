import React,{Component} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'

import Navbars from './Navbar'
import Login from './Login'
import Landing from './Landing'
import Register from './Register'
//import SurveyNew from './Surveys/SurveyNew'
import Dashboard from './Dashboard'
import Notification from './Notification'
import Profile from './Profile'

class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }

    render() {
        return(
            <div className="container">
            <BrowserRouter>
                    <div>
                        <Navbars />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/reminders" component={Dashboard} />
                        <Route exact path="/reminder/new" component={Notification} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                    </div>
            </BrowserRouter>
            </div>
        )
    }
}

export default connect (null,actions)(App);