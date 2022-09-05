import React from "react";

export default class MainSource extends React.Component {
    render(){
        return(
            <div className="main-source">
                <h1>
                        Total power: 100kW<br></br>
                        Power remaining: {this.props.powerRemaining}kW
                </h1>
            </div>
        )
    }
}