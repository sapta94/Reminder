import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import Loader from './Loader'
var moment = require('moment')

class Notification extends Component{

    constructor(props){
        super(props);
        this.state={
            title:'',
            description:'',
            notifyTime:'',
            notiID:null,
            submitted:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.renderEditValues=this.renderEditValues.bind(this)
        this.handleUpdate=this.handleUpdate.bind(this)
    }

    componentDidMount(){
        this.props.fetchUser();
        console.log(this.props.auth)
        this.renderEditValues();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { title, description, notifyTime } = this.state;
        console.log(title+' '+description)
         if (title && description && notifyTime) {
             this.props.insertNoti(title, description, new Date(notifyTime).getTime());
         }
    }

    handleUpdate(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { title, description, notifyTime, notiID } = this.state;
        console.log(title+' '+description)
         if (title && description && notifyTime) {
             this.props.updateNoti(title,notiID, description, new Date(notifyTime).getTime());
         }
    }

    getQueryString(key){
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    renderEditValues(){
        var prevTitle=this.getQueryString('title')||''
        var prevDesc=this.getQueryString('description')||''
        var notiID = this.getQueryString('notiID')||''
        var prevNotifyTime=parseInt(this.getQueryString('notifyTime'))||''
        console.log(prevNotifyTime)
        var dateStr= moment.unix((prevNotifyTime)/1000).format("DD-MM-YYYY hh:mm");
        this.setState({
            notiID:notiID,
            title:prevTitle,
            description:prevDesc,
            notifyTime:dateStr
        })
    }

    // callLogin(userID,password){
    //     console.log('login called')
    //     this.props.loginUser(userID,password)
    // }

    render(){
        var update=this.getQueryString('update')||null;
        if(this.state.submitted){
            var loader= <Loader visible={'visible'} />
        }
        else
            var loader=<Loader visible={'hidden'} />
        if(update){
            var displayBtn= <a onClick={this.handleUpdate} className="waves-effect waves-light btn">Update</a>
        }
        else{
           var displayBtn= <a onClick={this.handleSubmit} className="waves-effect waves-light btn">Set Reminder</a>
        }
        return(
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s4">
                            <input  onChange={this.handleChange} name="title" type="text" value={this.state.title} className="validate" />
                            <label for="title">Title</label>
                        </div>
                        <div className="input-field col s8">
                            <input onChange={this.handleChange} name="description" value={this.state.description} type="text" className="validate" />
                            <label for="description">Description</label>
                        </div>
                        <div className="col s6">
                            <input onChange={this.handleChange} name="notifyTime" value={this.state.notifyTime} type="datetime-local" className="validate" /> 
                            <label for="notifyTime">Date & Time</label>
                        </div>
                    </div>
                    {displayBtn}
                    {loader}
                </form>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {   
    return { auth };   
  }

export default connect (mapStateToProps,actions)(Notification);