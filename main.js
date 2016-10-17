
const electron = require('electron')
const ipcMain = require('electron').ipcMain

global.sharedObj = {myvar: "hellofrommainjs",
                    result:"1"};
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
 // createCatchWindow (); 
  createMainWindow();
}
function createMainWindow () {
   
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame:true,
    resizable: false,
    //alwaysOnTop:true,
    title:'BestSellers',
    titleBarStyle:'hidden-inset',
   // fullscreen:true,
   //backgroundColor:'#80FFFFFF',
    width: 1280,
    height: 800,
    'min-width': 500,
    'min-height': 500,
    'accept-first-mouse': true,
    
    webPreferences: {
        experimentalFeatures:true,
        experimentalCanvasFeatures:true,
        plugins: true,
        nodeIntegration: true,//这句是使用node 模块
        //webSecurity: false,
        //preload: path.join(__dirname, '../../inject/preload.js'),
      }
  })

  //读取 index.html ，设置path位置.
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

let amazonWindow;
function createAmazonWindow () {
  
  amazonWindow = new BrowserWindow({
    frame:true,
    resizable: true,
    alwaysOnTop:true,
    title:'Catch',
    x:1,
    y:1,
    titleBarStyle:'hidden-inset',
    closable:true,
    movable:true,
    width: 100,
    height: 100,
    
    webPreferences: {
        experimentalFeatures:true,
       // experimentalCanvasFeatures:true,
        plugins: true,
        nodeIntegration: true,//这句是使用node 模块
        //webSecurity: false,
        //preload: path.join(__dirname, '../../inject/preload.js'),
      }
  })

  //amazonWindow.loadURL('https://www.amazon.com/Best-Sellers-Appliances/zgbs/appliances/ref=zg_bs_nav_0')
  amazonWindow.loadURL(`file://${__dirname}/app/tpl/amazon.html`)

  // Open the DevTools.
  amazonWindow.webContents.openDevTools()
/*

  amazonWindow.webContents.on('did-finish-load', () => {
  amazonWindow.webContents.savePage('tmp/test.html', 'HTMLOnly', (error) => {
    if (!error) console.log('Save page successfully')
  })
  })
*/





  // Emitted when the window is closed.
  amazonWindow.on('closed', function () {
    amazonWindow = null
  })
}


//
let catchWin;
function createCatchWindow () {
  // Create the browser window.
  catchWin = new BrowserWindow({
    frame:false,
    resizable: false,
    alwaysOnTop:true,
    title:'BestSellers',
    titleBarStyle:'hidden-inset',
   // fullscreen:true,
   //backgroundColor:'#80FFFFFF',
    width: 100,
    height: 100,
    x:0,
    y:0,
    center:false,
    
    
    webPreferences: {
        experimentalFeatures:true,
        experimentalCanvasFeatures:true,
        plugins: true,
        nodeIntegration: true,//这句是使用node 模块
        //webSecurity: false,
        //preload: path.join(__dirname, '../../inject/preload.js'),
      }
  })

  //读取 index.html ，设置path位置.
  catchWin.loadURL(`file://${__dirname}/app/index.html`)

  // Open the DevTools.
  //catchWin.webContents.openDevTools()

  // Emitted when the window is closed.
  catchWin.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    catchWin = null
  })
}



ipcMain.on('click-button', function (event, arg) {
  console.log(arg) ;

  if (arg=="AnyDepartment") {
    

  };

  
  
  event.sender.send('click-button-reply', arg+"click")
})

ipcMain.on('asynchronous-message', function (event, arg) {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', function (event, arg) {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('catch',function (event, arg) {
  console.log(arg);
  if (amazonWindow==null) {
    createAmazonWindow();
  }else{
    amazonWindow.reload();
    amazonWindow.focusOnWebView();
  };
  
    global.sharedObj.dpf=arg;
    global.sharedObj.type=arg[2];
 

  //event.sender.send('catch-reply',arg);

})

ipcMain.on('catch-result-save',function (event, arg) {
  console.log("catch-result-save"+arg);
 //mainWindow.reload();

  event.sender.send('catch-result-save-reply',arg);

})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
