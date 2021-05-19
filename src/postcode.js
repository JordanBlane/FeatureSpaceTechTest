import React from 'react';
import './css/postcode.css';
const hostname = window.location.hostname;


export class PostCodePage extends React.Component {

    constructor(props){
        super(props)

        this.Init.bind(this);
        this.Init();
    }
    Init = () => {
        var postcode = this.props.match.params.id;
        
        //validate postcode
        fetch(`http://api.postcodes.io/postcodes/${postcode}/validate`)
        .then(result => result.json())
        .then(data => {
            //if unsuccessful go to mainpage
            if(data.status != 200){return window.location.href = `http://${hostname}/`}
            if(data.result == false) {return window.location.href = `http://${hostname}/`}

            //postcode information
            fetch(`http://api.postcodes.io/postcodes/${postcode}`)
            .then(result => result.json())
            .then(data => {
                if(data.status != 200){return window.location.href = `http://${hostname}/`}

                document.getElementById('postcodeDisplay').innerHTML = postcode;
                document.getElementById('countryDisplay').innerHTML = data.result.country;
                document.getElementById('regionDisplay').innerHTML = data.result.region;
                console.log(data.result.region)


            });

            //nearby postcodes
            fetch(`http://api.postcodes.io/postcodes/${postcode}/nearest`)
            .then(result => result.json())
            .then(data => {
                if(data.status != 200){return window.location.href = `http://${hostname}/`}

                console.log(data.result)
                for(let i = 0; i < data.result.length; i++){
                    let template = `<div class='nearbyPostcodeResultsDiv' onclick="window.location.href = 'http://${hostname}/postcode/${data.result[i].postcode}'"><h3 class='nearbyPostcodePostcode'>${data.result[i].postcode}</h3> <h3 class="nearbyPostcodeCountry">${data.result[i].country}</h3>  <h3 class="nearbyPostcodeRegion">${data.result[i].region}</h3></div>`
                    document.getElementById('nearbyPostcodesDiv').innerHTML += template;
                }
            })
        })
    }


    render(){
        return(
            <div className="postcodePageContainer">
                <div className="searchResultsDiv">
                    <h1 id='postcodeDisplay'></h1>
                    <h3 id='countryDisplay'></h3>
                    <h3 id='regionDisplay'></h3>
                </div>
                <div className="nearbyPostcodesDiv" id='nearbyPostcodesDiv'>
                    
                </div>
            </div>
        )
    }
}
