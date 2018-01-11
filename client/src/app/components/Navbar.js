import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Navbar extends React.Component{
    renderContent(){
        switch(this.props.auth){
            case null:
                return (
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                );
            case false:
                return <li><Link to='/login'>Click to Login</Link></li>
            default:
                return [
                <li key="1">My Reminders</li>,
                <li key="3" style={{"margin":"0 10px"}}>Add a reminder</li>,
                <li key="2"><a href="/auth/logout">Logout</a></li>
            ]
        }

    } 
    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth?'/survey':'/'}
                        className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right">
                       {this.renderContent()}
                    </ul>
                </div>
            </nav> 
        )
    }
}
function mapStateToProps({ auth }) {   
    return { auth };   
  }
  
export default connect(mapStateToProps)(Navbar); 