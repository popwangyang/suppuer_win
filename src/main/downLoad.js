import axios from 'axios'

 export default class Download{
	constructor(url) {
		this.url = url;
		console.log("ooooooo")
	}
	getLength(){
		return new Promise((resolve, reject) => {
			let send_data = {
				url: this.url
			}
			get('/music/music/store-length', send_data).then(res => {
				resolve(res)
			}).catch(e => {
				reject(e)
			})
		})
	}
	down(){
		return new Promise((resolve, reject) => {
			axios.get(this.url, {
        	responseType: 'blob'
        }).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	}
}