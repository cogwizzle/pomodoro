let permission = 'default';
let requestPermissionCallbackCount = 0;


/**
 * Mock notification api.
 */
export default class Notification {

  construct(message){
    this._message = message;
  }

  static requestPermission(callback){
    ++requestPermissionCallbackCount;
    callback();
  }

  static set permission(perm) {
    permission = perm;
  }

  static get permission() {
    return permission;
  }

  static get requestPermissionCallbackCount() {
    return requestPermissionCallbackCount;
  }

  static reset(){

    permission = 'default';
    requestPermissionCallbackCount = 0;
  }
}
