import {
	Base64
} from 'js-base64';
import {
	post
} from '@/components/api'

class VerifyFileExite {
	constructor(path) {
	   this.path = path;
	   this.isFileExite = this.verify();
	}
	
	verify() {
		return fs.existsSync(this.path);
	}
}


export {VerifyFileExite};