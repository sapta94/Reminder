import React,{Component} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../actions'

import Navbar from './Navbar'
//import Dashboard from './Dashboard'
import Landing from './Landing'
//import SurveyNew from './Surveys/SurveyNew'
const Dashboard = () => <h2>Dashboard</h2>
const ReminderNew = () => <h2>Reminder New</h2>

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
                        <Route exact path="/reminders" component={Dashboard} />
                        <Route exact path="/reminder/new" component={ReminderNew} />
                    </div>
            </BrowserRouter>
            </div>
        )
    }
}

export default connect (null,actions)(App);