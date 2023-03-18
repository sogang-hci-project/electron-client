import { createRoot } from 'react-dom/client';
import App from './App';
import { Channels } from '../type/main';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once(Channels.IPC_EXAMPLE, (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage(Channels.IPC_EXAMPLE, ['ping']);
