import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'

class Dashboard extends Component{
    componentWillMount(){
        this.props.fetchNoti('USER2')
        //console.log(this.props.noti)
    }

    render(){
        const notify=this.props.noti;
        if(notify!=null)
            console.log(notify.data)
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