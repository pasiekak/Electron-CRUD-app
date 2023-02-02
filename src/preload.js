// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts;

const { contextBridge, ipcRenderer } = require('electron');

const API = {
    sendTableColumns: (tableName) => ipcRenderer.invoke('tableColumns', tableName),
    sendTableNames: () => ipcRenderer.invoke('tableNames'),
    sendTable: (msg) => ipcRenderer.invoke('table', msg),
    sendSearchResult: ({searchText, tableName, tableColumn}) => ipcRenderer.invoke('search', {searchText, tableName, tableColumn}),
    sendColumnTypes: ({tableName, tableColumn}) => ipcRenderer.invoke('columnTypes', {tableName, tableColumn}),
    updateValue: ({tableName, tableColumn, columnType, oldValue, newValue}) => ipcRenderer.invoke('update',{tableName, tableColumn, columnType, oldValue, newValue}),
}

contextBridge.exposeInMainWorld('api', API);
