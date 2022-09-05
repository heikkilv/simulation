/*
* Copyright 2022 Tampere University
* This source code is licensed under the MIT license. See LICENSE in the repository root directory.
* Author(s): "Anh Pham (TAU)" <anh.pham@tuni.fi>
*/

const http = require('http');
const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json())
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

let allActiveStations = []
app.post('/activeStations', (request, response) => {
    const body = request.body
    const newStation = {
        id: body.id,
        name: body.name,
        maximumPower: body.maximumPower,
        powerUsing: body.powerUsing
    }
    const idx = allActiveStations.findIndex((station) => station.id === body.id)
    if (idx === -1){
        allActiveStations = allActiveStations.concat(newStation)
    }
    else {
        allActiveStations[idx] = newStation
    }
    response.json(newStation)
})
app.get('/activeStations', (request, response) => {
    response.json(allActiveStations)
})


const PORT = 8888
app.listen(PORT)
console.log(`Server running on port ${PORT}`)