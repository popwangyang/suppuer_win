
export default class EventEmitter {
	constructor() {
		this.event = {};
		this.keys = [];
	}
	
	addListener(key, callback){
		if(this.hasKey(key)) return;
		this.keys.push(key);
		Object.defineProperty(this.event, key, {
			set: (newValue) => {
				callback(newValue)
			},
			enumerable: true,
			configurable: true
		})
	}
	
	hasKey(key){
		return this.keys.indexOf(key) === -1 ? false:true;
	}
	
	emit(key, params){
	   if(!this.hasKey(key)) return;
	   this.event[key] = params || null;
	}
	
	removeListener(key, callback){
	   if(!this.hasKey(key)) return;
	   this.keys.splice(this.keys.indexOf(key), 1);
	   delete this.event[key];
	   callback();
	}

}