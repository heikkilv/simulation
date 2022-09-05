import Station from "../components/Station"
import data from '../db.json'
import MainSource from '../components/MainSource'
import React from 'react'
import ChartData from "./ChartData"
class StationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPowerUsed: 0
        };
        this.handleTotal = (num, uid) => {
            this.state[uid] = num;
        }
        this.changeNumber=()=>{
            const allPower = Object.values(this.state).slice(0, -2)
            this.setState({totalPowerUsed: allPower.reduce((partialSum, a) => partialSum+a, 0)});
        }
    }

    componentDidMount(){
        this.updatePower = setInterval(
            () => this.changeNumber(),
            1000)
        this.clock = setInterval(
            () => this.setCurrentTime(),
            1000
        )
    }

    componentWillUnmount(){
        clearInterval(this.updatePower);
    }

    setCurrentTime(){

        this.setState({
            currentTime: new Date().toLocaleTimeString()
        });
    }
    render() {
        const powerRemaining = 100 - this.state.totalPowerUsed;
        const allStationsPower = Object.entries(this.state).slice(0,-2).reduce((acc, [key, value], index) => 
        ((index < 10) ? { ...acc, [key] : value } : acc), 
        {});

        return (
            <>
                <MainSource powerRemaining={powerRemaining}/>
                <ChartData allStationsPower={allStationsPower} powerRemaining={powerRemaining}/>
                
                <div className="station-container">
                    {
                        data.stations.map((station) => {
                            return <Station key={station.id} 
                                            station={station} 
                                            currentTime={this.state.currentTime} 
                                            handleTotal={this.handleTotal} 
                                            uid={station.id} />
                        })
                    }
                </div>
            </>
        )
    }
}

export default StationContainer