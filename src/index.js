/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PageComponent from './js/components/PageComponent';
/* eslint-enable no-unused-vars */

const wrapper = document.getElementById('container');

if (wrapper) {
  ReactDOM.render(<PageComponent />, wrapper);
}
