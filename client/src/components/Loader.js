import React,{Component} from 'react'

class Loader extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{visibility:this.props.visible}}>
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Loader