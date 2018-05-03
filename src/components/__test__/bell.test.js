import Bell from '../bell';
import React from 'react';
import Renderer from 'react-test-renderer';
import Notification from '../__mocks__/notification.mock.js';

let toggleRingCount = 0;
let notificationCreated = 0;

global.Notification = {
  requestPermission : permission => {
    console.log('permission: ', permission);
  },
  reset: () => {
  
  },
  permission: 'default'
};

beforeEach(() => {
  toggleRingCount = 0;
  global.Notification.reset();
});

it(`Bell component shall request permission for notifications when the component updates.`, () => {

  let requestPermissionCall = jest.spyOn(Notification, 'requestPermission');
  let renderer = Renderer.create(
    <Bell ring={false} toggleRing={() => (++toggleRing)}/>
  );

  expect(requestPermissionCall).toHaveBeenCalled();
});
