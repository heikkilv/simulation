/*
* Copyright 2022 Tampere University
* This source code is licensed under the MIT license. See LICENSE in the repository root directory.
* Author(s): "Anh Pham (TAU)" <anh.pham@tuni.fi>
*/
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
