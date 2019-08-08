const state = {
  main: 0,
	data: [],
	data1:[],
	UPnumber: 0,
	DRnumber:0,
	currentID:""
}
const getters = {
	number: state => {
		   var arr = state.data;
			 var i = 0;
			     arr.map(function(item){
						  if(item.upState == "1"){
								  i++;
							}
					 })
      return i;
    }
	
}
const mutations = {
changeData1(state,obj){
   console.log(obj)	
	 var data = state.data1;
	 data.map(function(item){
		  if(item.id == obj.fileID){
				 item.content = obj.content
				 item.key = obj.key
				 item.credential = obj.credential
				 item.upState = obj.content.status == 3 ? 7:0
			}
	 })
console.log(data, "changeData1")
// data[obj.fileID].content = obj.content
	},
genXindex1(state){
		var arr = state.data1;
		    arr.map(function(item,index){
					  item.id = index +1;
				})
				state.data1 = arr;
	},
genXindex(state){
		var arr = state.data;
		    arr.map(function(item,index){
					  item.id = index +1;
				})
				state.data = arr;
	},
UploadesAll(state,arr){
		 var arr1 = state.data1;
		 // var arr2 = []
		 console.log(arr)
		 for(var i =0;i<arr.length;i++){
				 arr1.map(function(item,index){
					   if(arr[i].id == item.id){
							   
							   arr1.splice(index,1)
								 return;
						 }
				 })
		 }
		 state.data1 = arr1;
		 state.data = state.data.concat(arr)
		 
	},
startUplaodRepeatAll(state,arr){    
		var data = state.data.concat(arr);
	      state.data = data; 
				console.log(state.data)
	},
startUplaodRepeat(state,obj){//开始替换上传；
	 var data = state.data;
	 data.map(function(item){
		 if(item.id == obj.fileID){
			   item.upState = '1'
				 item.THid = obj.THid
		 }
	 })
	state.data = data; 
},
startUplaodRepeat1(state,obj){//开始替换上传；
	 var data = state.data;
	 data.map(function(item){
		 if(item.id == obj.fileID){
			   item.upState = '4'
				 item.THid = obj.THid
		 }
	 })
	state.data = data; 
},
startUplaodxiZheng(state,obj){//开始新增上传；
	var data = state.data;
	data.map(function(item){
		if(item.id == obj.fileID){
				item.upState = '1'
				item.content.status = 0
		}
	})
	state.data = data; 
},
startUplaodxiZheng1(state,obj){//开始新增上传；
	var data = state.data;
	data.map(function(item){
		if(item.id == obj.fileID){
				item.upState = '4'
				item.content.status = 0
		}
	})
	state.data = data; 
},
uploadFile(state,id){
		var data = state.data1;
		var obj = "";
		data.map(function(item,index){
			   if(item.id == id){
					 obj = item
					 data.splice(index,1)
				 }
		})
		state.data.push(obj)
		state.UPnumber = state.data.length;
		state.DRnumber = state.data1.length;
	},
saveUpload(state,arr){
	 var data = arr.concat(state.data1);
	 data.map(function(item){
		 console.log(item,"item")
		   if(item.content.status == 3){
				  item.upState = '7'
			 }
	 })
	  state.data1 = data;
},
 UPnumber1(state,num){
	 state.UPnumber = num;
 },
 DRnumber1(state,num){
	 state.DRnumber = num;
 },
	foo(state,data){
		state.data = data
	},
	goo(state,obj){
		var arr = state.data;
		arr.map(function(item){
			  if(item.id == obj.id){
					var str = obj.key
					   item[str] = obj.value
				}
		})
		// console.log(state.data)
		state.data = arr;
	},
	hoo(state,obj){
		state.data.push(obj)
	},
	Loading(state){
		var arr = state.data;
		var flage = true
		// console.log(getters.number,"getters.number")
		arr.map(function(item){
			if(item.upState == "4"){
				if(flage){					 
				item.upState = "9"
				flage = false
				}
			}	 
		})		
		state.data = arr;		 
	},
	NEXT(state){
		var arr = state.data;
		var flage = true
		// console.log(getters.number,"getters.number")
		arr.map(function(item){
			 if(item.upState == "4"){
				 if(flage){					 
				 item.upState = "1"
				 state.currentID = item.id
				 flage = false
				 }
			 }	 
		})		
		state.data = arr;		 
		 // console.log('getters.number')
	},
	signOut(state) {
		state.data = [];
	  state.data1 = [];
	  state.UPnumber =  0;
	  state.DRnumber = 0;
	},
// 	hackResetFalse(){
// 		var arr = state.data;
// 		var id = state.currentID;
// 		arr.map(function(item){
// 			 if(item.id == id){
// 				 item.hackReset = false;
// 			 }
// 		})
// 		state.data = arr;
// 	},
// 	hackResetTrue(){
// 		var arr = state.data;
// 		var id = state.currentID;
// 		arr.map(function(item){
// 			if(item.id == id){
// 				item.hackReset = true;
// 			}
// 		})
// 		state.data = arr;
// 	},
  delect1(state,id){
		var arr = state.data1;
		console.log(arr,id,"Counter delect")
		    arr.map(function(item,index){
					  if(item.id == id){
							arr.splice(index,1)
						}
				})
				state.data1 = arr;
				// console.log(state.data)
	},
	delectAll1(state,arrAll){
		var arr = state.data1;
		var arr1 = [];
		arr.map(function(item){
				var flage = true;
				arrAll.map(function(item1){
					if(item.id == item1.id){
								flage = false;
					}
				})
				if(flage){
					arr1.push(item)
				}
		})
		state.data1 = arr1;
		
	},
	delect(state,id){
		var arr = state.data;
		console.log(arr,id,"Counter delect")
		    arr.map(function(item,index){
					  if(item.id == id){
							arr.splice(index,1)
						}
				})
				state.data = arr;
				
	},
	delectAll(state,arrAll){
		var arr = state.data;
		var arr1 = [];
    arr.map(function(item){
			  var flage = true;
			  arrAll.map(function(item1){
					 if(item.id == item1.id){
						    flage = false;
					 }
				})
				if(flage){
					arr1.push(item)
				}
		})
		state.data = arr1;
		console.log(arrAll)
	}
}

const actions = {
  someAsyncTask ({ commit }) {
    
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
	getters,
  mutations,
  actions
}
