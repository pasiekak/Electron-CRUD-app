// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts;

const { contextBridge, ipcRenderer } = require('electron');

const API = {
    sendTableColumns: (tableName) => ipcRenderer.invoke('tableColumns', tableName),
    sendTableNames: () => ipcRenderer.invoke('tableNames'),
    sendTable: (msg) => ipcRenderer.invoke('table', msg),
    sendColumnType: ({tableName, columnName}) => ipcRenderer.invoke('columnType', {tableName, columnName}),
    sendSearchResult: ({searchText, tableName, tableColumn}) => ipcRenderer.invoke('search', {searchText, tableName, tableColumn}),
    sendNullableColumns: (tableName) => ipcRenderer.invoke('null',tableName),
    deleteRow: ({tableName, idColumnName, idColumnValue}) => ipcRenderer.invoke('delete',{tableName, idColumnName, idColumnValue}),
    insertValues: ({tableName, values}) => ipcRenderer.invoke('insert', {tableName, values}),
    updateValue: ({tableName, columnName, idColumnName, idValue, oldValue, newValue}) => ipcRenderer.invoke('update',{tableName, columnName, idColumnName, idValue, oldValue, newValue}),
}

contextBridge.exposeInMainWorld('api', API);
