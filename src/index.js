const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const oracledb = require("oracledb");
const projectPath = path.join(__dirname,'..');
const dbMG = require('./database/dbMG');

// Live reload - ELECTRON
require('electron-reload')(projectPath, {
  app: require(path.join(__dirname,'..','node_modules/electron'))
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('tableNames', async (event, args) => {
  let tables = await dbMG.getTableNames();
  return tables;
});
ipcMain.handle('table', async (event, args) => {
  let tableRows = await dbMG.getTableRows(args);
  return tableRows;
});
ipcMain.handle('search', async (event, args) => {
  let searchResult = await dbMG.getSearchResult(args);
  return searchResult;
})
ipcMain.handle('tableColumns', async (event, args) => {
  let tableColumns = await dbMG.getTableColumns(args);
  return tableColumns;
})
ipcMain.handle('update', async (event, args) => {
  let message = await dbMG.updateValue(args);
  return message;
})
ipcMain.handle('columnType', async (event, args) => {
  let columnType = await dbMG.getColumnType(args);
  return columnType;
})
ipcMain.handle('null', async (event, args) => {
  let nullableColumns = await dbMG.getNullableColumns(args);
  return nullableColumns;
})
ipcMain.handle('insert', async (event, args) => {
  let message = await dbMG.insertValues(args);
  return message;
})
ipcMain.handle('delete', async (event, args) => {
  let message = await dbMG.deleteRow(args);
  return message;
})