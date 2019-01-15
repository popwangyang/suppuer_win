const state = {
	currentIndex:0,
	historyRoute :['/LibraryManagement'],
	flage : true
  }
const mutations = {
	RouterFlageGB(state){
		state.flage = false;
	},
	RouterFlageDK(){
		state.flage = true;
	},
	RouterBack(state){
		console.log("RouterBack")
		state.currentIndex--;	
		// state.flage = true;
	},
	RouterGo(state){
		state.currentIndex++;
		// state.flage = true;
	},
	RouteFoo(state,str){
		var arr = state.historyRoute;
		    arr.push(str);
		state.historyRoute = arr;
		state.currentIndex = arr.length-1;
		// state.flage = true;
	},
	RouteGoo(state,str){
		console.log("RouteGoo",state.historyRoute,state.currentIndex)
		var arr = state.historyRoute.slice(0,state.currentIndex+1);
		    arr.push(str)
				console.log(arr)
			state.historyRoute = arr;
			state.currentIndex = arr.length-1;
			// state.flage = true;
	},
	RouteInitialization(state){
		console.log("oooopp")
		state.currentIndex = 0;
		state.historyRoute = ['/LibraryManagement'];
		state.flage = true;
	}
}
export default {
  state,
  
  mutations,
  
}