import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

class Dashboard extends Component{
    componentWillMount(){
       
        //console.log(this.props.noti)
    }

    render(){
        //const {noti}=this.props.noti;
        console.log(this.props.noti)
        return(
            <div style={{textAlign:'center'}}>
                Dashboard
            </div>
        )
    }
}

function mapStateToProps({ auth,noti }) {   
    return { auth,noti };   
  }
  
export default connect(mapStateToProps,actions)(Dashboard);