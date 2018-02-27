import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {Collection,CollectionItem} from 'react-materialize'

class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            user:{},
            firstName:'',
            lastName:'',
            email:'',
            photo:'',
        }
        //this.handleUpdate=this.handleUpdate.bind(this)
    }

    componentWillMount(){
        //this.props.profileImg()
        this.setState({
            user:this.props.auth,
            firstName:this.getQueryString('firstName'),
            lastName:this.getQueryString('lastName'),
            email:this.getQueryString('email'),
            photo:this.getQueryString('photo')
        })

    }
    getQueryString(key){
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    render(){
        console.log(this.state.data)
        return(
            <div className="row">
                <div className="col s4 offset-s4">
                <Collection>
                    <CollectionItem>{this.state.firstName}</CollectionItem>
                    <CollectionItem>{this.state.lastName}</CollectionItem>
                    <CollectionItem>{this.state.email}</CollectionItem>
                    <CollectionItem>My sexy photo</CollectionItem>
                </Collection>
                </div>
            </div>
        )
    }

}
function mapStateToProps({ auth,proPic }) {   
    return { auth,proPic };   
  }
  
export default connect(mapStateToProps)(Profile); 
