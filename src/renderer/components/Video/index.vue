<template>
	<div class="videoBox">
	  <video id="myVideo" controls/>
	</div>
</template>

<script>
	import { dorpDOM } from '../util'
	const ipcRenderer = require('electron').ipcRenderer;
	export default{
		data(){
			return{
				video: null,
				currentSrc:'http://localhost:4398?startTime=0',
			}
		},
		methods:{
			initVideo(){
			  let video = document.getElementById('myVideo');
			  video.src = 'http://localhost:4398?startTime=0';
			  video.play();
			}
		},
		mounted() {
			console.log(document.getElementsByClassName('videoBox')[0], dorpDOM)
			dorpDOM(document.getElementsByClassName('videoBox')[0], (file) => {
				ipcRenderer.send('fileDrop', file[0].path);
			})
			ipcRenderer.on('duration', (event, time) => {
				console.log(time)
				this.initVideo()
			});
		}
	}
</script>

<style scoped="scoped">
	.videoBox{
		width: 100%;
		height: 100%;
		background: yellow;
	}
</style>
