import React from 'react';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

export default class PomodoroTimerControls extends React.Component{
  
  /**
   * Default constructor.
   */
  constructor(props){
    super(props);
  }

  /**
   * After component mounts.
   */
  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  /**
   * Before react is removed from DOM.
   */
  componentWillUnmount() {
    this.unsubscribe()
  }

  /**
   * JSX based render function.
   */
  render(){
    const { store } = this.context;
    let wrapper = {
      "width" : "151px",
    }

    let buttonStyle = {
      "boxShadow": "5px 0px 5px #888888",
      "width" : "50%",
      "border":"2px solid",
    }

    return (
      <div style={wrapper}>
        <button style={buttonStyle} onClick={this._toggleCountDown.bind(this)}><i className={(store.getState().isTicking) ? 'fa fa-pause' : 'fa fa-play'} /></button>
        <button style={buttonStyle} onClick={this._skip.bind(this)}><i className="fa fa-fast-forward" /></button>
      </div>
    );
  }

  /**
   * Toggle on and off count down.
   */
  _toggleCountDown(){
    const { store } = this.context;

    store.dispatch({
      type: 'TOGGLE_TIMER'
    });
  }

  _skip() {
    const { store } = this.context;
    const { isWorking, isTicking, workTime, restTime } = store.getState();

    if (isTicking) {
      store.dispatch({
        type: 'TOGGLE_TIMER'
      });
    }

    store.dispatch({
      type: 'SET_TIMER',
      time: (isWorking) ? restTime : workTime,
      isWorking: isWorking
    });
  }
}
PomodoroTimerControls.contextTypes = {
  store: PropTypes.object
};
