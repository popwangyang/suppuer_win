import {
	app,
	BrowserWindow,
	ipcMain,
	Menu,
	Tray,
	dialog 
} from 'electron'
const macObj = require('getmac')
const path = require('path')
var package1 = require("../../package.json");
import {
	autoUpdater
} from "electron-updater"

if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let childWindow
let appIcon = null
const template = [

	{
		label: "登录",
		click() {

		},
		icon: path.join(__static, "/denlu.png")
	},

	{
		label: "注销             ",
		click: function() {
			if (numWindow == 2) {
				mainWindow.webContents.send('closeChild')
			} else {
				mainWindow.webContents.send('exitLogin')
			}
		}
	},
	{
		label: '退出            ',
		click: function() {
			// mainWindow.close()
			if (numWindow == 2) {
				mainWindow.webContents.send('closeChild')
			} else {
				mainWindow.webContents.send('closeWindow')
			}
		},
		icon: path.join(__static, "/tuchu.png")
	}

]
var numWindow = 1
const winURL = process.env.NODE_ENV === 'development' ?
	`http://localhost:9080` :
	`file://${__dirname}/index.html`
const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
	// Someone tried to run a second instance, we should focus our window.
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore()
		mainWindow.focus()
	}
})

if (isSecondInstance) {
	app.quit()
}



function createWindow() {
	/**
	 * Initial window options
	 */
	console.log(package1.version)
	mainWindow = new BrowserWindow({
		maxHeight: 760,
		minHeight: 760,
		width: 1400,
		useContentSize: true,
		maxWidth: 1400,
		minWidth: 1400,
		height: 760,
		frame: false,
		thickFrame: true,
		autoHideMenuBar: true,
		opcity: 0,
		titleBarStyle: 'hiddenInset',
		maximizable: false //Boolean类型（可选参数）- 窗口是否可以最大化。这个参数在Linux中是无效的。默认为true。       
	})
	mainWindow.webContents.openDevTools();
	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {

		mainWindow = null
	})
	createTray();
	mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
		//设置文件存放位置
		// item.setSavePath("C:\Users\Administrator\Desktop");
		item.on('updated', (event, state) => {
			if (state === 'interrupted') {
				console.log('Download is interrupted but can be resumed')
			} else if (state === 'progressing') {
				if (item.isPaused()) {
					console.log('Download is paused')
				} else {
					console.log(`Received bytes: ${item.getReceivedBytes()}`)
				}
			}
		})
		item.once('done', (event, state) => {
			if (state === 'completed') {
				console.log('Download successfully')
			} else {

			}
		})
	})
}

function createTray() {
	const iconName = process.platform === 'win32' ? '1.ico' : 'iconTemplate.png'
	const iconPath = path.join(__static, "/1.ico")
	// const iconPath = `file://${__dirname}/renderer/assets/logo.png`
	// console.log(iconPath)
	appIcon = new Tray(iconPath)
	const contextMenu = Menu.buildFromTemplate(template)
	appIcon.on('click', () => {
		// mainWindow.isVisible() ? "" : mainWindow.show()
		var flage = mainWindow.isVisible();
		var flage1 = mainWindow.isMaximized();
		console.log(flage, flage1)
		if (!flage) {
			mainWindow.show()

		} else {
			if (!flage1) {
				mainWindow.restore()
			}
		}
	})
	appIcon.setToolTip('娱网正音')
	appIcon.setContextMenu(contextMenu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		appIcon.destroy()
		appIcon = null;
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})
ipcMain.on("window-login", function(event, user) {
	console.log(user)
	template.shift()
	template.unshift({
		label: user,
		click() {

		},
		icon: path.join(__static, "/denlu.png")
	}, )
	// console.log(template)
	appIcon.destroy()
	appIcon = null;
	createTray()
})
ipcMain.on("window-exitLogin", function() {
	template.shift()
	template.unshift({
		label: "登录",
		click() {

		},
		icon: path.join(__static, "/denlu.png")
	})
	// console.log(template)
	appIcon.destroy()
	appIcon = null;
	createTray()

})
ipcMain.on('window-minSize', function() {
	mainWindow.minimize()
})

ipcMain.on('window-close', function() {
	// console.log(childWindow)
	if (numWindow == 2) {
		mainWindow.webContents.send('closeChild')
	} else {
		mainWindow.close()
	}
})
ipcMain.on("exitLogin", function() {

	if (numWindow == 2) {
		mainWindow.webContents.send('closeChild')
	}
})
ipcMain.on('download', function(event, arg) {
	console.log(arg); // prints "ping"
	mainWindow.webContents.downloadURL(arg);
});



ipcMain.on('synchronous-message', (event, arg) => {
	console.log(arg)
	switch (arg) {
		case 'mac':
			macObj.getMac(function(err, macAddress) {
				if (err) throw err;

				event.returnValue = macAddress
			});
			break;
		case 'version':
			event.returnValue = package1.version
			break;
	}
})
ipcMain.on('window-maxSize', function() {
	mainWindow.maximize()
})

ipcMain.on('window-restore', function() {
	mainWindow.restore()
})
ipcMain.on('childWindow', function() {
	console.log(numWindow)
	if (numWindow == 1) {
		childWindow = new BrowserWindow({
			minHeight: 600,
			width: 800,
			useContentSize: true,
			minWidth: 800,
			height: 600,
			frame: false,
			thickFrame: true,
			autoHideMenuBar: true,
			opcity: 0,
			titleBarStyle: 'hiddenInset'
		})
		// childWindow.webContents.openDevTools();
		const childURL = process.env.NODE_ENV === 'development' ?
			`http://localhost:9080/index.html#/backGround` :
			`file://${__dirname}/index.html#/backGround`
		childWindow.loadURL(childURL)
		childWindow.on('closed', () => {
			console.log('childWindowclosed')
			numWindow--
			childWindow = null
		})
		numWindow++
	} else {
		childWindow.webContents.send('song')
	}
});

var flage = true;

ipcMain.on("force-update", function(event, arg) {
	flage = true;
	// var str = "https://test.bjywkd.com/supplier_win/Test_QZupdate/"
	var str = "https://test.bjywkd.com/supplier_win/Master_QZupdate/"
	if (process.env.NODE_ENV !== 'development') {
		console.log('force-update')
		foo(str)
	}

});
ipcMain.on("handle-update", function(event, arg) {
	// var str = "https://test.bjywkd.com/supplier_win/Test_HDupdate/"
	var str = "https://test.bjywkd.com/supplier_win/Master_HDupdate/"
	if (process.env.NODE_ENV !== 'development') {

		foo(str)
	}
});

function foo(url) {
	const os = require("os");
	let updateFeedUrl;

	if (os.platform() == 'darwin') {
		updateFeedUrl = url
	} else {
		updateFeedUrl = url
	}
	if (!flage) {
		autoUpdater.autoDownload = false;
	}

	autoUpdater.setFeedURL(updateFeedUrl);

	//执行自动更新检查
	autoUpdater.checkForUpdates();


}

function QZsendMessage(text) {

	mainWindow.webContents.send('QZmessage', text)
};

function HDsendMessage(text) {

	mainWindow.webContents.send('HDmessage', text)
}


//autoUpdater的监听事件；
autoUpdater.on('error', function(error) {
	sendQZUpdateMessage('error')


});
autoUpdater.on('checking-for-update', function() {

});
autoUpdater.on('update-available', function(info) {

	if (flage) {

		QZsendMessage('update-available')

	} else {

		HDsendMessage('update-available')
		ipcMain.on('startUpdate', function() {

			autoUpdater.downloadUpdate();

		})

	}

});
autoUpdater.on('update-not-available', function(info) {
	console.log("ooooooopppppppppppppp")
	if (flage) {
		flage = false;
		QZsendMessage('update-not-available')

	} else {

		HDsendMessage('update-not-available')

	}




});
autoUpdater.on('download-progress', function(progressObj) {
	mainWindow.webContents.send('downloadProgress', progressObj)
})

autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {

	if (flage) {

		QZsendMessage('update-downloaded')

	} else {

		HDsendMessage('update-downloaded')

	}

	mainWindow.webContents.send('programInformation', releaseName)
	ipcMain.on("startInstall", function() {

		autoUpdater.quitAndInstall();

	})

});
