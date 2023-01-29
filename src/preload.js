// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts;

const { contextBridge, ipcRenderer } = require('electron');


const API = {
    sendTables: () => ipcRenderer.invoke('tables'),
    sendTable: (msg) => ipcRenderer.invoke('table', msg),
}

contextBridge.exposeInMainWorld('api', API);
