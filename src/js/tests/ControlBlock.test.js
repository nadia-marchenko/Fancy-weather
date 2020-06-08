/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import ControlBlock from '../components/ControlBlock';
/* eslint-enable no-unused-vars */

describe('>>>ControlBlock --- Snapshot', () => {
  it('+++capturing Snapshot of TodayWeather', () => {
    const renderedValue = renderer.create(<ControlBlock/>).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});
