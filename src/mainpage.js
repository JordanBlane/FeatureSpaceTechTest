import React from 'react';
import './css/mainpage.css';
const hostname = window.location.hostname;


export class MainPage extends React.Component {

    constructor(props){
        super(props);
    
        this.state={
        }
    }  


    render(){
        return(
            <div className="MainPageContainer">
                <div className="searchDiv">
                    <input placeholder="Postcode.." className="mainpageInput" id='searchInput'/>
                    <button className="mainpageButton" id='searchButton' onClick={()=>{window.location.href = `http://${hostname}/postcode/${document.getElementById('searchInput').value}`}}>🔍</button>
                </div>
            </div>
        )
    }
}
