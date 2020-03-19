
const NAMEARRS = ['singer', 'name', 'singer_type', 'language', 
                 'picture', 'area', 'voice_type', 'format_type', 
				 'voice_track', 'vocal_track'];
				 
export default class GetFileName {
	constructor(fileData, type) {
	    this.fileData = fileData;
		this.type = type;
		this.uploadName = this.getName();
	}
	
	getName(){
		let name = '';
		NAMEARRS.forEach(item => {
			let result = '无';
			if(this.fileData[item]){
				result = this.fileData[item];
			}
			name += result + "￥";
		})
		name = name.substr(0, name.length-1);
		
		return name + this.type;
	}
}