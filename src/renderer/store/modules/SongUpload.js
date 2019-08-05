import Upload from '../../components/upload.js'

const state = {
	songNumbers: [],
	Upload: Upload,
};

const getters = {
	
}

const mutations = {
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