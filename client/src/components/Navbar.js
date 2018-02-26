import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar,NavItem} from 'react-materialize'

class Navbars extends React.Component{
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
                return [
                    <NavItem key="1"><Link to='/register'>Register</Link></NavItem>,
                    <NavItem key="2"><Link to='/login'>Click to Login</Link></NavItem>
                ]
            default:
                return [
                <NavItem key="1"><Link to="/reminders">My Reminders</Link></NavItem>,
                <NavItem key="3" style={{"margin":"0 10px"}}><Link to="/reminder/new">Add a reminder</Link></NavItem>,
                <NavItem key="2"><a href="/api/logout">Logout</a></NavItem>
            ]
        }

    } 
    render(){
        return(
            <Navbar brand='RemindME' right>
               {this.renderContent()}
            </Navbar>
            // <nav>
            //     <div className="nav-wrapper indigo">
            //             <Link to={this.props.auth?'/survey':'/'}
            //                 className="brand-logo">
            //                 RemindMe
            //             </Link>
            //             <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                        
            //             <ul className="right hide-on-med-and-down">
            //                 {this.renderContent()}
            //             </ul>
                        
            //             <ul className="side-nav" id="mobile-demo">
            //                 {this.renderContent()}
            //             </ul>
            //     </div>
            // </nav> 
        )
    }
}
function mapStateToProps({ auth,noti }) {   
    return { auth,noti };   
  }
  
export default connect(mapStateToProps)(Navbars); 