const state = {
	songNumbers: []
};

const getters = {
	
}

const mutations = {
	saveSong(state, obj) {
		state.songNumbers.push(obj);
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