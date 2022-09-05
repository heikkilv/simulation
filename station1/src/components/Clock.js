/*
* Copyright 2022 Tampere University
* This source code is licensed under the MIT license. See LICENSE in the repository root directory.
* Author(s): "Anh Pham (TAU)" <anh.pham@tuni.fi>
*/
import React from "react";
class AlarmClock extends React.Component {
    constructor() {
        super();
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        this.state = {
            currentDate: date,
            currentTime: ''
        };
    }
  
    componentDidMount(){
        this.clock = setInterval(
            () => this.setCurrentTime(),
            1000
        )
    }

    componentWillUnmount(){
        clearInterval(this.clock);
        clearInterval(this.interval);
    }
  
    setCurrentTime(){

        this.setState({
            currentTime: new Date().toLocaleTimeString()
        });
    }
         
    render() {
        return (
            <div>
            <h2>It is {this.state.currentDate} {this.state.currentTime}
            </h2>
            </div>
        );
    }
}
  
  export default AlarmClock;