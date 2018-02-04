import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Navbar extends React.Component{
    renderContent(){
        //console.log(this.props.noti)
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
                <li key="1"><Link to="/reminders">My Reminders</Link></li>,
                <li key="3" style={{"margin":"0 10px"}}><Link to="/reminder/new">Add a reminder</Link></li>,
                <li key="2"><a href="/api/logout">Logout</a></li>
            ]
        }

    } 
    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth?'/survey':'/'}
                        className="left brand-logo">
                        RemindMe
                    </Link>
                    <ul className="right">
                       {this.renderContent()}
                    </ul>
                </div>
            </nav> 
        )
    }
}
function mapStateToProps({ auth,noti }) {   
    return { auth,noti };   
  }
  
export default connect(mapStateToProps)(Navbar); 