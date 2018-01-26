import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

class Notification extends Component{

    constructor(props){
        super(props);
        this.state={
            title:null,
            description:null,
            notifyTime:'',
            submitted:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.fetchUser();
        console.log(this.props.auth)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { title, description, notifyTime } = this.state;
        console.log(firstname+' '+lastname)
        if (firstname && lastname && password) {
            this.props.registerUser(firstname, lastname, password);
        }
    }

    getQueryString(key){
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    // callLogin(userID,password){
    //     console.log('login called')
    //     this.props.loginUser(userID,password)
    // }

    render(){
        var user = this.props.fetchUser();
        var prevTitle=this.getQueryString('title')||''
        var prevDesc=this.getQueryString('description')||''
        var prevNotifyTime=this.getQueryString('notifyTime')||''
        return(
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            <input  onChange={this.handleChange} name="title" type="text" value={prevTitle} className="validate" />
                            <label for="first_name">Title</label>
                        </div>
                        <div className="input-field col s8">
                            <input onChange={this.handleChange} name="description" value={prevDesc} type="text" className="validate" />
                            <label for="last_name">Description</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} name="notifyTime" value={prevNotifyTime} type="date" className="validate" />
                            <label for="last_name">Date & Time</label>
                        </div>
                    </div>
                    <a onClick={this.handleSubmit} className="waves-effect waves-light btn">Set Reminder</a>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {   
    return { auth };   
  }

export default connect (mapStateToProps,actions)(Notification);