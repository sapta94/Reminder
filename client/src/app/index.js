import React from "react";
import ReactDOM,{render} from "react-dom";
import Navbar from "./components/Navbar"
class App extends React.Component{
    render(){
        return (
            <div>
                <Navbar />
            </div>
        )
    }
}
render(<App />,window.document.getElementById('root'));