
import { fixPathForAsarUnpack } from './util.js'
const ffmpegPath = fixPathForAsarUnpack(require('@ffmpeg-installer/ffmpeg').path);
const ffprobePath = fixPathForAsarUnpack(require('@ffprobe-installer/ffprobe').path);
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
import axios from 'axios';
var express = require('express');
var app = new express();

export const Express = function(){
	this.videoSourceInfo;
	this._ffmpegCommand;
}

Express.prototype.killFfmpegCommand = function(){
	 if (this._ffmpegCommand) {
	    this._ffmpegCommand.kill();
	}
}

Express.prototype.createServer = function(){
	app.get('/', (req, res) => {
		console.log('ssss', req.query.startTime)
		var startTime = req.query.startTime;
		let videoCodec = this.videoSourceInfo.checkResult.videoCodecSupport ? 'copy' : 'libx264';
		let audioCodec = this.videoSourceInfo.checkResult.audioCodecSupport ? 'copy' : 'aac';
		console.log('result');
		axios.get('http://testmusiccdn.bjywkd.com/cf7e4e58-c58c-11e9-b835-00163e0e12f4.mpeg?e=1566558361&token=2rQOHCtd0arWFy6PWwOLWrIGpf9fN06dAz_IxVZd:e2rFgR_CkOgH76yKX3RduvXZF9U=', {
			responseType: 'blob'
		}).then(result => {
			console.log('result');
			// let readStream = fs.createReadStream(this.videoSourceInfo.videoSourcePath);
			this.killFfmpegCommand();
			this._ffmpegCommand = ffmpeg()
			    .input(result)
			    .nativeFramerate() // 以本机帧速率读取输入
			    .videoCodec(videoCodec)
			    .audioCodec(audioCodec)
			    .format('mp4')
			    .seekInput(startTime)
			    .outputOptions('-movflags', 'frag_keyframe+empty_moov') // 转换x264到Fragmented MP4格式
			    .on('progress', function (progress) {
			        console.log('time: ' + progress.timemark);
			    })
			    .on('error', function (err) {
			        console.log('An error occurred: ' + err.message);
			    })
			    .on('end', function () {
			        console.log('Processing finished !');
			    })
			let videoStream = this._ffmpegCommand.pipe();
			videoStream.pipe(res);	
		})
	})
	 
	app.listen(4398, function(){
		console.log('http:localhost:4398')
	})
}