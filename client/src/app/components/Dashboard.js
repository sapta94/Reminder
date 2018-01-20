import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
var moment = require('moment')

class Section extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var dateString = moment.unix(parseInt(this.props.time)).format("DD/MM/YY");
        return(
            <div class="row">
                <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">{this.props.title}</span>
                    <p>{this.props.desc}</p>
                    </div>
                    <div class="card-action">
                    <a href="#">{dateString}</a>
                    <a href="#">Edit</a>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

class Dashboard extends Component{
    componentWillMount(){
        this.props.fetchNoti('USER2')
        //console.log(this.props.noti)
    }

    render(){
        const notify=this.props.noti;
        if(notify!=null){
            console.log(notify.data)
            return(
                <Section title={notify.data[0].Title} desc={notify.data[0].Description} time={notify.data[0].CreateTime}/>
            )
        }
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