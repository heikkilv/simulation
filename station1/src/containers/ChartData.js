import React, {useEffect, useState} from "react";
import io from 'socket.io-client'
import {
    BarChart,
    Bar,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts';


class ChartData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            powerRemainingData: [],
            allPowerData: []
        }
        this.setSeconds = () => {
            this.setState(prevState => ({
                seconds: prevState.seconds + 1,
                powerRemainingData: [...prevState.powerRemainingData, {seconds: this.state.seconds, value: this.props.powerRemaining}],
                
            }))
            const newPowerData = [...this.state.allPowerData]
            const allPowerCurrentState = this.props.allStationsPower
            allPowerCurrentState['seconds'] = this.state.seconds
            newPowerData.push(allPowerCurrentState)
            this.setState({allPowerData: newPowerData})
            
        }
        
    }
    componentDidMount(){
        this.updateSeconds = setInterval(
            () => this.setSeconds(), 1000
        )
    }
    componentWillUnmount(){
        clearInterval(this.updateSeconds);
    }

    render() {
        return(
            <div>
                <LineChart width={1000} height={500} data={this.state.powerRemainingData} >
                    <XAxis dataKey="seconds" domain={['this.state.seconds - 20', 'this.state.seconds']} />
                    <YAxis />
                    <Line dataKey="value" />
                </LineChart>

                <LineChart width={1000} height={500} data={this.state.allPowerData}>
                    <XAxis dataKey="seconds"/>
                    <YAxis/>
                    <Legend/>
                    <Line dataKey="1" stroke="red"/>
                    <Line dataKey="2" stroke="green"/>
                    <Line dataKey="3" stroke="blue"/>
                    <Line dataKey="4"/>
                    <Line dataKey="5"/>
                    <Line dataKey="6"/>
                    <Line dataKey="7"/>
                    <Line dataKey="8"/>
                    <Line dataKey="9"/>
                    <Line dataKey="10"/>
                </LineChart>

            </div>
        )
    }
}

export default ChartData