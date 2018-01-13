import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

class Register extends Component{

    constructor(props){
        super(props);
        this.state={
            firstname:null,
            lastname:null,
            password:'',
            confirm:null,
            submitted:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount(){
        console.log(this.props.auth)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
                            <input  onChange={this.handleChange} name="firstname" type="text" className="validate" />
                            <label for="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} name="middlename" type="text" className="validate" />
                            <label for="last_name">Last Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} name="password" type="text" className="validate" />
                            <label for="last_name">Password</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} name="confirm" type="text" className="validate" />
                            <label for="last_name">Confirm Password</label>
                        </div>
                    </div>
                    <a onClick={this.handleSubmit} className="waves-effect waves-light btn">Register</a>
                </form>
            </div>
        )
    }
}


export default connect (null,actions)(Register);