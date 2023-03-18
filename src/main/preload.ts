// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {
  Channels,
  GetFileDataArgument,
  GetFileDataResponse,
  GetFileUrlArgument,
  GetFileUrlResponse,
} from '../type/main';

const electronHandler = {
  // Default example
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  // File Handler
  fileHandler: {
    getFileData(args: GetFileDataArgument) {
      ipcRenderer.send(Channels.GET_FILE_DATA, args);
    },
    onFileData(func: (res: GetFileDataResponse) => void) {
      ipcRenderer.once(Channels.GET_FILE_DATA, (_event, res) => func(res));
    },
    getFileUrl(args: GetFileUrlArgument) {
      ipcRenderer.send(Channels.GET_FILE_URL, args);
    },
    onFileUrl(func: (res: GetFileUrlResponse) => void) {
      ipcRenderer.once(Channels.GET_FILE_URL, (_event, res) => func(res));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
