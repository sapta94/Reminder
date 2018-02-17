import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import Image from 'react-image-file';
var moment = require('moment')

class Section extends Component{
    constructor(props){
        super(props)
        this.state={
            loaderVisible:true
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        window.location.href="/reminder/new?title="+this.props.title+"&description="+this.props.desc+"&notifyTime="+this.props.time+"&notiID="+this.props.notiID+"&update=1";
    }
    render(){
        var dateString = moment.unix(parseInt(this.props.time)/1000).format("DD/MM/YY");
        return(
            <div className="row">
                <div className="col s6 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">{this.props.title}</span>
                    <p>{this.props.desc}</p>
                    </div>
                    <div className="card-action">
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
        this.props.fetchNoti()
        this.props.profileImg()
        //console.log(this.props.noti)
    }

    render(){
        const notify=this.props.noti;
        const proPic=this.props.proPic;
        console.log(proPic)
        if(notify!=null && proPic!=null){
            //console.log(notify.data)
            <Loader visible={false} />
            var resData = notify.data;
            console.log(resData)
            return(
                <div> 
                   <div className='col s12'>
                       <div className="profile">
                            <img style={{borderRadius:'50%',border:'2px solid white' }} height="100" width="100" src={"data:image/gif;base64,"+proPic} alt='some text'/>
                            <span className="nameHolder">
                                 Welcome! <br />
                                 {this.props.auth.FirstName+' '+this.props.auth.LastName} <br />
                                 {this.props.auth.Email}
                            </span>
                        </div>
                   </div>
                   
                {
                    resData.map(function(element,index) {
                        return <Section key={index} notiID={element._id} title={element.Title} desc={element.Description} time={element.NotifyTime}/>
                    }) 
                }
                
                </div> 
            )
        }
        return(
                
                <div style={{textAlign:'center',marginTop:'30%'}}>
                    <Loader visible={true} />
                    Dashboard
                </div>
            
        )
    }
}

function mapStateToProps({ auth,noti,proPic }) {   
    return { auth,noti,proPic };   
  }
  
export default connect(mapStateToProps,actions)(Dashboard);