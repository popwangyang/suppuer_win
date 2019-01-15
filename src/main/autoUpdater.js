import { app, BrowserWindow ,ipcMain,Menu ,Tray,dialog } from 'electron'

import { autoUpdater} from "electron-updater"

export default class autoUpdater{
	constructor(ipcMain, autoUpdater, mainWindow) {
	    this.flage = true;
		this.ipcMain = ipcMain;
		this.autoUpdater = autoUpdater;
		this.mainWindow = mainWindow;
		this.startOn(this.ipcMain, this.autoUpdater, this.mainWindow);
	}
	
	startOn(ipcMain, autoUpdater, mainWindow){
		ipcMain.on("force-update",function(event, arg){
			var str = "https://test.bjywkd.com/supplier_win/Test_QZupdate/"
			// var str = "https://test.bjywkd.com/supplier_win/Master_QZupdate/"
			if (process.env.NODE_ENV !== 'development') {
			  foo(str)
			}	
		});
		ipcMain.on("handle-update",function(event, arg){
			var str = "https://test.bjywkd.com/supplier_win/Test_HDupdate/"
			// var str = "https://test.bjywkd.com/supplier_win/Master_HDupdate/"
			if (process.env.NODE_ENV !== 'development') {
				foo(str)
			}
		});
		//autoUpdater的监听事件；
		  autoUpdater.on('error', function(error){
				 // sendQZUpdateMessage('error')
			 
					
			});
			autoUpdater.on('checking-for-update', function() {
		
					}); 
			autoUpdater.on('update-available', function(info) {
							 
									if(flage){
										
										QZsendMessage('update-available')
										
									}else{
										
										HDsendMessage('update-available')
										ipcMain.on('startUpdate',function(){
																	  
													autoUpdater.downloadUpdate();
																
										     })
										
									}
		
							});
			 autoUpdater.on('update-not-available', function(info) {
						console.log("ppp",info)
						if(flage){
							flage = false;
							QZsendMessage('update-not-available')
							
					 }else{
						 
						  HDsendMessage('update-not-available')
						 
					 }
		 
							});
			autoUpdater.on('download-progress', function(progressObj) {
								mainWindow.webContents.send('downloadProgress', progressObj)
						})
		
			autoUpdater.on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
																
									if(flage){
										
										QZsendMessage('update-downloaded')
										
									}else{
										
										HDsendMessage('update-downloaded')
										
									}			
									console.log(releaseNotes, releaseName, releaseDate, updateUrl)
									mainWindow.webContents.send('programInformation', releaseName)
									ipcMain.on("startInstall",function(){
										
										autoUpdater.quitAndInstall();
									
									})				 
					});
	}
	
	foo(url){
		const os=require("os");
		let updateFeedUrl;
		console.log(url)
		if(os.platform()=='darwin'){
		            updateFeedUrl=url
		        }else{
		            updateFeedUrl=url
		        }
				if(!flage){
					this.autoUpdater.autoDownload = false;
				}
			  this.autoUpdater.setFeedURL(updateFeedUrl);
				
				//执行自动更新检查
				this.autoUpdater.checkForUpdates();		
	}
	
	QZsendMessage(text) {
			console.log(text)
		    this.mainWindow.webContents.send('QZmessage',text)
		};
	HDsendMessage(text) {
			console.log(text)
		    this.mainWindow.webContents.send('HDmessage',text)
		}
	
}
		
