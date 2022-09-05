import '../App.css'
import StationContainer from './StationContainer'
import React from 'react';
import Clock from '../components/Clock'
class App extends React.Component{
    render(){
        return(
            <>
            <Clock/>
            <StationContainer />
            </>
        )
    }
}

export default App;
