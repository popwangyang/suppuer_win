import { app } from 'electron'

class startApp {
	constructor() {
	    
	}
	init(){
		app.on('ready', createWindow);
		app.on('window-all-closed', quitWindow);
		
	}
}