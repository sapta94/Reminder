import React,{Component} from 'react'
import * as actions from '../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from './Loader'
import Image from 'react-image-file';
import {CollapsibleComponent, CollapsibleHead, CollapsibleContent} from 'react-collapsible-component'
import {Collapsible,CollapsibleItem} from 'react-materialize'

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

    handleClick(title,desc,time,notiID){
        window.location.href="/reminder/new?title="+title+"&description="+desc+"&notifyTime="+time+"&notiID="+notiID+"&update=1";
    }

    deleteNoti(notiID){
        if(window.confirm('Are you sure')){
            this.props.deleteNoti(notiID)
            var respData = this.props.deleteNoti;
            if(respData.message=='success'){
                this.props.fetchNoti();
            }
            else{
                console.log('async issue bitch')
            }
        }
    }

    render(){
        const notify=this.props.noti;
        const proPic=this.props.proPic;
        var that=this;
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
                   <div class="noti-container">
                       <h2>Reminders</h2>
                        <Collapsible popout defaultActiveKey={1}>
                        {
                            resData.map(function(element,index) {
                                var btn=<span style={{float:'right',cursor:'pointer'}}><i onClick={()=>that.handleClick(element.Title,element.Description,element.NotifyTime,element._id)} class="fa fa-edit"></i>{'   '}<i onClick={()=>that.deleteNoti(element._id)} class="fa fa-trash"></i></span>
                                return (
                                    <CollapsibleItem key={index} header={element.Title} icon='whatshot'>
                                        <p>{element.Description}<br/><i class="fa fa-calendar-check-o" style={{fontSize:'24px'}}></i>{moment.unix(parseInt(element.NotifyTime)/1000).format("DD/MM/YY HH:mm")}</p> {btn}
                                    </CollapsibleItem>
                                )
                                //return <Section key={index} notiID={element._id} title={element.Title} desc={element.Description} time={element.NotifyTime}/>
                            }) 
                        }
                        </Collapsible>
                    </div>
               
                
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

function mapStateToProps({ auth,noti,proPic,deleteNoti }) {   
    return { auth,noti,proPic,deleteNoti };   
  }
  
export default connect(mapStateToProps,actions)(Dashboard);