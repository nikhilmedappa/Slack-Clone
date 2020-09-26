const { app, BrowserWindow, Menu } = require('electron');

const path = require('path');
const url = require('url');


process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false
let mainWindow;

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

function createWindow() {
    mainWindow = new BrowserWindow({
        title: "faek",
        width: 1000, 
        height: 800,
        backgroundColor: 'black',
    });
    
    mainWindow.loadURL(startUrl);
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null
    })

    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
      });
}

app.on('ready', () => {
    createWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('closed', () => mainWindow = null)
});

const menu = [
        ...(isMac ? [{ role: 'appMenu'}] : []),
    {
       role: 'fileMenu'
    },
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'toggleDevTools' },
            ]
        }
    ]:[]),
]

app.on('window-all-closed', function(){
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if(mainWindow === null) {
        createWindow()
    }
});

