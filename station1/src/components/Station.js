import _ from "lodash";
import React from "react";
import axios from "axios";
class Station extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            batteryPercentage: 0,
            powerUsing: 0,
            buttonDisabled: false,
            alarmTime: '',
            totalChargingDuration: 0
        };
        this.tick = this.tick.bind(this)
        this.setAlarmTime = this.setAlarmTime.bind(this)
        this.updateState = this.updateState.bind(this)
    }

    tick=async () =>{
        this.setState({
            buttonDisabled: true,
            powerUsing: this.props.station.maximumPower
        })
        const intervalValue = 1000;
        this.clockInterval = setInterval(()=>{
            this.setState(prevState => ({
                seconds: Math.min(prevState.seconds + 100, this.state.totalChargingDuration)
            }));
            this.props.handleTotal(this.state.powerUsing, this.props.uid)
            this.sendDataToServer()
        }, intervalValue);
    }

    sendDataToServer() {
        var mutualUrl = `http://localhost:8888/activeStations/`;
        var currentStation = this.props.station
        currentStation["powerUsing"] = this.state.powerUsing
        const cur = currentStation
        axios.post(mutualUrl, cur).catch(err => console.log(err))
    }

    setAlarmTime(event) {
        event.preventDefault();
        const inputAlarmTimeModified = event.target.value + ':00'
        const currentSecond = new Date().getHours()*3600 + new Date().getMinutes()*60 + new Date().getSeconds();
        const targetSecond = inputAlarmTimeModified.split(':')[0]*3600 + inputAlarmTimeModified.split(':')[1]*60;
        this.setState({
          alarmTime: inputAlarmTimeModified,
          totalChargingDuration: Math.abs(targetSecond-currentSecond),
          buttonDisabled: false,
        })
    }

    checkBattery(totalDuration){
        if(this.state.batteryPercentage >= 100){
            this.setState({batteryPercentage: 100});
            this.setState({powerUsing: 0});
        }
        else if (this.state.seconds >= totalDuration){
            this.setState(prevState => ({
                batteryPercentage: prevState.batteryPercentage
            }));
            this.setState({powerUsing: 0});
        }
    }

    setUpPowerLongDuration(maxPower){
            this.setState({powerUsing: 0.2*maxPower});
            this.setState(prevState => ({
                batteryPercentage: prevState.batteryPercentage +  (0.02*maxPower)
            }));
    }

    setUpPowerMediumDuration(seconds, maxPower){
        if (seconds < 5000){
            this.setState({powerUsing: 0.6*maxPower});
            this.setState(prevState => ({
                batteryPercentage: prevState.batteryPercentage + (0.06*maxPower)
            }));
        }
        else if (seconds >= 5000 && seconds < 10000){
            this.setState({powerUsing: 0.2*maxPower});
            this.setState(prevState => ({
                batteryPercentage: prevState.batteryPercentage + (0.02*maxPower)
            }));
        }
    }

    setUpPowerShortDuration(seconds, maxPower){
        if (seconds < 2000){
            this.setState({powerUsing: maxPower});
            this.setState(prevState => ({
                batteryPercentage: prevState.batteryPercentage + (0.1*maxPower)
            }));
        }
        else if (seconds >= 2000 && seconds < 4000){
            this.setState({powerUsing: 0.6*maxPower});
            this.setState(prevState => ({
                batteryPercentage: prevState.batteryPercentage + (0.06*maxPower)
            }));
        }
        else if (seconds >= 4000 && seconds < 10000){
            this.setState({powerUsing: 0.2*maxPower});
            this.setState(prevState => ({
                batteryPercentage: prevState.batteryPercentage + (0.02*maxPower)
            }));
        }
    }

    powerRouting(totalDuration){
        const seconds = this.state.seconds;
        const maxPower = this.props.station.maximumPower;
        if (this.state.seconds < this.state.totalChargingDuration){
            if (totalDuration >= 20000){
            this.setUpPowerLongDuration(maxPower);
            }
            else if (totalDuration >= 10000 && totalDuration < 20000){
                this.setUpPowerMediumDuration(seconds, maxPower);
            }
            else if (totalDuration > 0 && totalDuration < 10000){
                this.setUpPowerShortDuration(seconds, maxPower);
            }
        }
        
        this.checkBattery(totalDuration);
    }

    checkAlarmClock(){
        if(this.state.alarmTime === 'undefined' || !this.state.alarmTime) {
            this.alarmMessage = "Time when car is needed:";
        } else {
            this.alarmMessage = "Your car will be unplugged at " + this.state.alarmTime + ".";
            const totalTime = this.state.totalChargingDuration;
            this.powerRouting(totalTime);
        }   
    }

    convertTime(totalSecond){
        const roundedHours = Math.floor(totalSecond / 3600);
        const roundedMinutes = Math.floor((totalSecond - roundedHours*3600)/60);
        const roundedSeconds = totalSecond - roundedHours*3600 -roundedMinutes*60;
        return [roundedHours, roundedMinutes, roundedSeconds];
    }

    getStateValue() {
        const totalSecond = this.state.seconds;
        const powerUsing = this.state.powerUsing;
        const batteryPercentage = this.state.batteryPercentage;
        return [totalSecond, powerUsing, batteryPercentage];
    }

    updateState(){
        
    }

    componentDidMount(){
        this.alarm = setInterval(
            () => this.checkAlarmClock(),
            1000);
    }

    componentWillUnmount() {
        clearInterval(this.clockInterval);
        clearInterval(this.alarm);
    }
    render(){
        
        const station = this.props.station
        const [totalSecond, powerUsing, batteryPercentage] = this.getStateValue();
        const [roundedHours, roundedMinutes, roundedSeconds] = this.convertTime(totalSecond);
        return (
            <div className="station">
                <h2>{station.name}</h2>
                <p>Maximum power: {station.maximumPower}kW</p>
                <p>Power using: {powerUsing}kW</p>
                <p>Battery: {batteryPercentage}%</p>
                Clock: {roundedHours}h : {roundedMinutes}m : {roundedSeconds}s
                <br></br>
                <h4>{this.alarmMessage}</h4>
                <form>
                    <input type="time" onChange={this.setAlarmTime}></input>
                </form>
                <button disabled={this.state.buttonDisabled} onClick={this.tick} >Start</button>
                <br></br><br></br>
            </div>
        )
    }
}

export default Station;