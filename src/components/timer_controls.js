import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

/**
 * Wrapper style for wrapper div.
 */
const wrapper = {
  "width" : "151px",
}

/**
 * Style for buttons.
 */
const buttonStyle = {
  "width" : "50%",
  "border":"2px solid",
}

/**
 * React component for rendering controls for timer.
 * Requires:
 *   isTicking propety to designate if the timer is ticking.
 *   toggle property for the first button.
 *   skip property for the second button.
 *
 * @param map {object} Map of properties for React component.
 * return {Component} Timer controls component.
 */
const TimerControls = ({ toggle, skip, isTicking }) => (
  <div className='timer_controls' style={wrapper}>
    <button style={buttonStyle} onClick={toggle}><i className={(isTicking) ? 'fa fa-pause' : 'fa fa-play'} /></button>
    <button style={buttonStyle} onClick={skip}><i className="fa fa-fast-forward" /></button>
  </div>
);

module.exports = TimerControls;
