import React from 'react';

/**
 * React component for alerting that time has expired.
 * Requires:
 *  ring property that designates if the element should ring.
 *  alert proprty passing the sound source to the element.
 *  toggleRing function that allows the component to toggle the ring state.
 */
export default class Bell extends React.Component {
  
  /**
   * Default constructor.
   *
   * @param {Object[]} props Tag properties.
   */
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (Notification.permission === 'default') {

      Notification.requestPermission(permission => {

        if (permission === 'granted') {

          let notification = new Notification('Notifications on.');
        }
      });
    }

    if(this.props.ring){

      if(this.props.alert)
        new Audio(this.props.alert).play();

      if(Notification.permission === 'granted') {

        let notification = new Notification('Timer expired!');
      }

      this.props.toggleRing();
    }
  }

  /**
   * JSX based render function.
   *
   * @return {string} JSX DOM.
   */
  render() {

    return null;
  }
}
