import Bell from '../bell';
import React from 'react';
import Renderer from 'react-test-renderer';
import Notification from '../__mocks__/notification.mock.js';

let toggleRingCount = 0;
let notificationCreated = 0;

global.Notification = Notification;

beforeEach(() => {
  toggleRingCount = 0;
  global.Notification.reset();
});

it(`Bell component shall request permission for notifications when the component updates.`, () => {

  console.log('renderer: ', renderer);
  let renderer = Renderer.render(
    <Bell ring={false} toggleRing={() => (++toggleRing)}/>
  );

  expect(requstPermissionCall).toHaveBeenCalled();
});
