import { createRoot } from 'react-dom/client';
import App from './App';
import { Channels } from '../type/main';
import { store } from './store';
import { Provider } from 'react-redux';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once(Channels.IPC_EXAMPLE, (arg: any) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage(Channels.IPC_EXAMPLE, ['ping']);
