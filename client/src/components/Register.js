import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import Loader from './Loader'

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
        const { firstname, lastname, password,confirm } = this.state;
        if(password!=confirm){
            alert('password and confirm password does not match')
            return
        }
        console.log(firstname+' '+lastname)
        if (firstname && lastname && password) {
            this.props.registerUser(firstname, lastname, password);
        }
    }


    // callLogin(userID,password){
    //     console.log('login called')
    //     this.props.loginUser(userID,password)
    // }

    render(){
        if(this.state.submitted){
            var btn = <div><a className="btn disabled">Submitting..</a><i class="fa fa-spinner fa-spin" style={{fontSize:'24px'}}></i></div>
            
            //var loader= <Loader visible={'visible'} />
        }
        else
            var btn =  <a onClick={this.handleSubmit} className="waves-effect waves-light btn">Register</a>
            //var loader=<Loader visible={'hidden'} />
        return(
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input  onChange={this.handleChange} name="firstname" type="text" className="validate" />
                            <label for="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} name="lastname" type="text" className="validate" />
                            <label for="last_name">Last Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} name="password" type="password" className="validate" />
                            <label for="last_name">Password</label>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleChange} name="confirm" type="password" className="validate" />
                            <label for="last_name">Confirm Password</label>
                        </div>
                    </div>
                    {btn}
                </form>
    
            </div>
        )
    }
}


export default connect (null,actions)(Register);