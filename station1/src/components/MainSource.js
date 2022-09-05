/*
* Copyright 2022 Tampere University
* This source code is licensed under the MIT license. See LICENSE in the repository root directory.
* Author(s): "Anh Pham (TAU)" <anh.pham@tuni.fi>
*/
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