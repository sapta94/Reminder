import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

class Login extends Component{

    // callLogin(userID,password){
    //     console.log('login called')
    //     this.props.loginUser(userID,password)
    // }

    render(){
        return(
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input  id="first_name" type="text" className="validate" />
                            <label for="first_name">User ID</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="last_name" type="text" className="validate" />
                            <label for="last_name">Password</label>
                        </div>
                    </div>
                    <a onClick={()=> this.props.loginUser('USER2','superman')} className="waves-effect waves-light btn">Login</a>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {   
    return { auth };   
  }

export default connect (mapStateToProps,actions)(Login);