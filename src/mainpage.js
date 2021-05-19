import React from 'react';
import './css/mainpage.css';
const hostname = window.location.hostname;


export class MainPage extends React.Component {

    constructor(props){
        super(props);
    
        this.state={
        }
    }  

    autocomplete = () => {
        document.getElementById('dropdownDiv').innerHTML = '';
        var postcode = document.getElementById('searchInput').value;
        if(postcode == ''){return;}

        fetch(`http://api.postcodes.io/postcodes/${postcode}/autocomplete`)
        .then(result => result.json())
        .then(data => {
            if(!data.result){return;}
            if(data.result.length < 1){return;}
            for(let i = 0; i < data.result.length; i++)
            {
                let template = `<div onclick="window.location.href='http://${hostname}/postcode/${data.result[i]}'"> <h3>${data.result[i]}</h3> </div>`
                document.getElementById('dropdownDiv').innerHTML += template;
            }
        })
    }


    render(){
        return(
            <div className="MainPageContainer">
                <div className="searchDiv">
                    <input placeholder="Postcode.." onChange={()=>{this.autocomplete()}} className="mainpageInput" id='searchInput'/>
                    <button className="mainpageButton" id='searchButton' onClick={()=>{window.location.href = `http://${hostname}/postcode/${document.getElementById('searchInput').value}`}}>🔍</button>
                    <div className="dropdownDiv" id='dropdownDiv'>

                    </div>
                </div>
            </div>
        )
    }
}
