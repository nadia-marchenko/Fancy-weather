// import Form from "./js/Form";
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PageComponent from './js/PageComponent';

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<PageComponent />, wrapper) : false;
