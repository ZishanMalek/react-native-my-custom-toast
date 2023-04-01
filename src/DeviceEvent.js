import {DeviceEventEmitter} from 'react-native';
import { SHOW_TOAST_MESSAGE } from './ToastFile';

const toast = {
  info: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'info'});
  },
  success: options => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {...options, type: 'success'});
  },
};

export default toast;
