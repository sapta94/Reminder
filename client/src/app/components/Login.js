import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            username:'m',
            password:'s',
            submitted:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state.username)
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.loginUser(username, password);
        }
    }


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
                            <input  onChange={this.handleChange} name="username" type="text" className="validate" />
                            <label for="first_name">User ID</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} name="password" type="text" className="validate" />
                            <label for="last_name">Password</label>
                        </div>
                    </div>
                    <a onClick={this.handleSubmit} className="waves-effect waves-light btn">Login</a>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {   
    return { auth };   
  }

export default connect (mapStateToProps,actions)(Login);