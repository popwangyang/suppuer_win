
const fs = require("fs");
const path = require('path');
const CHUNKLENGTH = 1024 * 1024 / 2;  // 每一片的长度
const BLOCKLENGTH = 4 * 1024 * 1024;  // 每一块的长度

export default class SliceFile {
	constructor(file, chunkLength, blockLength) {
	    this.file = file;
	    this.chunkLength = chunkLength || CHUNKLENGTH;
	    this.blockLength = blockLength || BLOCKLENGTH;
	    this.sliceArr = this.slice();
	}
	
	slice(){
		let arr = [];
		var allChunkNum = Math.ceil(this.file.size / this.chunkLength);
		var n = 0;
		for (let i = 0; i < allChunkNum; i++) {
			if (n < 8) {
				n++;
			} else {
				n = 1;
			};
			var obj = {};
			obj.type = n;
			obj.start = this.chunkLength * i;
			obj.end = this.chunkLength * (i + 1) - 1;
			obj.BlockIndex = Math.ceil((i + 1) / 8);
			obj.ChunkIndex = n;
			if (n == 1) {
				obj.typeText = "firstChunkBinary"
				if (i < (allChunkNum - 8)) {
					obj.BlockSize = this.blockLength
				} else {
					obj.BlockSize = this.file.size - this.chunkLength * i;
				}
			} else {
				obj.typeText = "nextChunkOffset"
			}
			arr.push(obj);
		};
		return arr;
	}
}