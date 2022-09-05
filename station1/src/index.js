/*
* Copyright 2022 Tampere University
* This source code is licensed under the MIT license. See LICENSE in the repository root directory.
* Author(s): "Anh Pham (TAU)" <anh.pham@tuni.fi>
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './containers/App';
import {BrowserRouter} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter><App /></BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
