import Upload from '../../components/upload.js'

const state = {
	songNumbers: [],
	Upload: Upload,
	uploadSongNumbers: 0,
};

const getters = {
	importSongNumbers(state){
		return state.songNumbers.length;
	}
}

const mutations = {
	setUplaodNum(state, num){
		state.uploadSongNumbers = num;
	},
	saveSong(state, obj) {
		state.songNumbers.push(obj);
	},
	setData(state, obj) {
		let songNumbers = state.songNumbers;
		for(let i = 0; i < songNumbers.length; i++){
			if(songNumbers[i].id == obj.fileID){
				for(let key in obj){
					if(key != 'fileID'){
						songNumbers[i][key] = obj[key];
					}
				}
			}
		}
	},
	deleteSong(state, ids) {
		let results = [];
		state.songNumbers.forEach((item, index) => {
			if(ids.indexOf(item.id) == -1){
				results.push(item);
			}
		})
		state.songNumbers = results;
	},
	uploadSong(state, ids) {
		let results = []
		state.songNumbers.forEach((item, index) => {
			if(ids.indexOf(item.id) > -1){
				new Upload(item, "http://up-z1.qiniup.com");
			}else{
				results.push(item);
			}
		})
		state.songNumbers = results;
		state.uploadSongNumbers += ids.length;
	}
}

const actions = {
	
}

export default {
  state,
  getters,
  mutations,
  actions
}