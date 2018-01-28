import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
var moment = require('moment')

class Section extends Component{
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        window.location.href="/reminder/new?title="+this.props.title+"&description="+this.props.desc+"&notifyTime="+this.props.time;
    }
    render(){
        var dateString = moment.unix(parseInt(this.props.time)/1000).format("DD/MM/YY");
        return(
            <div class="row">
                <div class="col s6 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">{this.props.title}</span>
                    <p>{this.props.desc}</p>
                    </div>
                    <div class="card-action">
                    <a href="#">{dateString}</a>
                    <a onClick={this.handleClick}>Edit</a>
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
            //console.log(notify.data)
            var resData = notify.data;
            console.log(resData)
            return( 
                resData.map(function(element,index) {
                    return <Section title={element.Title} desc={element.Description} time={element.CreateTime}/>
                }) 
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