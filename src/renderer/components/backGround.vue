<template>
   	<div id="CustomManagement" @keydown="whichButton(event)">
		<div style="height: 40px;display: flex;align-items: center;">
			<div style="flex: 1;height: 40px;line-height: 40px;-webkit-app-region: drag;box-sizing: border-box;padding-left: 20px;color: #777777;font-size: 18px;">{{videoTitle}}</div>
			<div style="width: 40px;text-align: center;font-size: 20px;color: #777777;cursor: pointer;">
				<i class="el-icon-close" @click="close"></i>
			</div>
		</div>		
		<div class="CustomManagement_a" @mouseenter="mouseenter" @mouseleave="mouseleave" >	
		     <transition name="slide-fade">
					<span class="videoS" v-show="flage" :style="videoS">
						<div style="height: 100%;width: 150px;display: flex;align-items:center;justify-content: space-around;">
							<i class="iconfont icon-shangyishou videobofang" :class="{isquping:!flage5,notquping:flage5}" @click.stop.self="foo6"></i>
							<i class="iconfont icon-sanjiao videobofang" :class="{isquping:!flage5,notquping:flage5}" @click.stop.self="foo4" v-if="flage4"></i>
							<i class="iconfont icon-xiazaizanting videobofang" :class="{isquping:!flage5,notquping:flage5}" @click.stop.self="foo4" v-else></i>
							<i class="iconfont icon-xiayishou videobofang" :class="{isquping:!flage5,notquping:flage5}" @click.stop.self="foo7"></i>
						</div>
						<div class="block" style="height: 100%;flex: 1;padding-top: 8px;box-sizing: border-box;position: relative;" ref="blockDOM">				    
						    <el-slider v-model="value2" @change='change' :show-tooltip="false"></el-slider>
						    <span class="block_M" :style="blockWidth" @click="goo($event)"></span>
						</div>
						<div style="height: 100%;width: 120px;display: flex;align-items: center;justify-content: center;font-size: 20px;" :class="{isquping:!flage5,notquping:flage5}">
							{{time1}} / {{time2}}
						</div>
						<div style="width: 60px;height: 100%;display: flex;align-items: center;box-sizing: border-box;padding: 0 20px;flex-direction: column;" @mouseleave="shenyin1">				
						     <i class="iconfont icon-yinliang videobofang" :class="{isquping:!flage5,notquping:flage5}" style="margin-top: 10px;" @mouseenter="shenyin" @click="shenyin2" v-if="flage7"></i>			  				
						     <i class="iconfont icon-jingyin videobofang" :class="{isquping:!flage5,notquping:flage5}" style="margin-top: 10px;" @mouseenter="shenyin" @click="shenyin2" v-else></i>			  				
							 
							 <div class="block" style="margin-top: -100px;" v-show="flage3">
							    <el-slider
							      v-model="value1"
							      vertical
							      @change='change1'
							      height="60px">
							    </el-slider>					    
							</div>
						</div>				
						<div style="width: 60px;height: 100%;display: flex;align-items: center;justify-content: center;">
							<i class="iconfont icon-quanping videobofang" :class="{isquping:!flage5,notquping:flage5}" @click.stop.self="quanScreen"></i>
						</div>
			</span>
			</transition>
			<span class="videoM" v-show="flage1" @click.stop="foo1">
				<i class="iconfont icon-bofang1 videobofang" style="font-size: 40px;color: white;" @click.stop="foo2"></i>				
			</span>
			<span class="videoM" style="background: black;z-index: 317483648;" v-show="flage6">
				<img src="../assets/loading.gif"/>
			</span>
			<span class="videoM" style="background: black;z-index: 317483648;" v-show="flage9">
				         <p style="color: white;">暂不支持该视频格式</p> 
			</span>
			<span class="videoM" v-show="flage2">
				<i class="iconfont icon-zhongbo videobofang" style="display: flex;flex-direction: column;margin-right: 20px;color: white;"></i>
				<i class="iconfont icon-xiazai videobofang"  style="display: flex;flex-direction: column;margin-left: 20px;color: white;"></i>
			</span>
			<video id="video" class="video1" :class="{video2:!flage}" preload="load"  @click.stop.self="foo3">				
		        <source :src="src" />	
	   		   <!-- <source src="movie.mp4" type="video/mp4">
            <source src="movie.ogg" type="video/ogg">-->
         您的浏览器不支持 video 标签。    
	        </video>
		</div>	
		<div style="height: 50px;"></div>
	</div>
</template>
<script>
	import { get ,baseUrl } from "./api";
	const {ipcRenderer} = require('electron')
  let currentWindow = require('electron').remote.getCurrentWindow()	
export default {
  name: 'backGround',
  	data(){
			return{
				flage:true,
				flage1:true,
				flage2:false,
				flage3:false,
				flage4:true,
				flage5:true,
				flage6:false,
				flage7:true,
				flage8:true,
				flage9:false,
				myVideo:'',
				value1:50,
				value2:0,
				vertical:true,
				time1:'',
				time2:'',
				time3:"",
				time4:"",
				blockWidth:"width:100%",
				blockDOM:"",
				bufferedTime:"",
				Movetime:"",
				currentNum:0,
				windowHeight:'',
				windowWidth:"",
				yihuanchun:0,
				videoS:'',
				src:"",
				data:[],
				videoTitle:"",
				task_id:""
			}
		},
		methods:{
			close(){//关闭窗口
				currentWindow.close()
				this.data = ''
				this.currentNum = ""
				localStorage.removeItem('videoPlayList')
			},
			quanScreen(){
				var ele = document.querySelector('.CustomManagement_a');
				    ele.style.width = '100%';
				    ele.style.height = '100%';
			if(this.flage5){				    					    
                if (ele.requestFullscreen) {
				        ele.requestFullscreen();
				    } else if (ele .mozRequestFullScreen) {
				        ele.mozRequestFullScreen();
				    } else if (ele .webkitRequestFullScreen) {
				        ele.webkitRequestFullScreen();
				    }
				    
		        }else{ 
		        	
				 	if (document.exitFullscreen) {
				            document.exitFullscreen();
				    } else if (document.mozCancelFullScreen) {
				            document.mozCancelFullScreen();
				    } else if (document.webkitCancelFullScreen) {
				            document.webkitCancelFullScreen();
				    }
				 	
				 }
				 
				 this.flage5 = !this.flage5
				
			},
			mouseenter(){
//				if(!this.flage1){
//					this.flage = true
//				}
               
//				console.log('mouseenter')
			},
			mouseleave(){
//				if(!this.flage){
//					this.flage = false
//				}
//				console.log('mouseleave')
			},
			whichButton(event){
				
			},
			foo1(){
				console.log('1')
			},
			foo2(){
				console.log('2')
				var _this = this
				this.myVideo.play()
				this.flage1 = false
				this.flage = true
				this.flage4 = false 
				setTimeout(function(){
					_this.flage = false
				},10008800)
			},
			foo3(){
				console.log('3')
				if(!this.myVideo.paused){
					this.myVideo.pause()										
				}else{
					this.myVideo.play()					
				}
				this.flage1 = !this.flage1
				this.flage4 = !this.flage4
			},
			foo4(){
			console.log('foo4')
				if(this.myVideo.paused){
					this.myVideo.play()
					this.flage4 = false
					this.flage1 = false
				}else{
				    this.myVideo.pause()
					this.flage4 = true
					this.flage1 = true				 
				}
			},
//			foo5(){
//			console.log('foo5',this.myVideo.paused)
//				if(!this.myVideo.paused){
//					this.myVideo.pause()
//					this.flage4 = !this.flage4
//					this.flage1 = true
//				}
//			},
			foo6(){
				var num = this.data.length;
				var currentNum = this.currentNum;
				this.blockWidth = "width:100%"
				this.flage9 = false;
				if(currentNum>0){
					this.currentNum--;
				}else{
					this.currentNum = num-1
				}
				this.flage6 = true
				// this.src = this.data[this.currentNum].http
				this.videoTitle = this.data[this.currentNum].name;
				this.value2 = 0;
				this.flage4 = false
// 				this.myVideo.load()
// 				this.myVideo.play()
				var type = this.data[this.currentNum].http.slice(this.data[this.currentNum].http.length-3,this.data[this.currentNum].http.length)
				if(type == "mp4" || type == "webm" || type == 'ogg'){
					this.src  =this.getToken(this.data[this.currentNum].http)
					this.videoTitle = this.data[this.currentNum].name
					this.myVideo.load()
					this.myVideo.play()
				}else{
					this.flage6 = true;
					this.transcoding()
				}
			},
			foo7(){
				var num = this.data.length;
				var currentNum = this.currentNum;
				this.blockWidth = "width:100%"
				this.flage9 = false;
				if(currentNum<num-1){
					this.currentNum++
					
				}else{
					this.currentNum = 0
					
				}
				this.flage6 = true
				// this.src = this.data[this.currentNum].http
				this.videoTitle = this.data[this.currentNum].name;
				this.value2 = 0;
				this.flage4 = false
				// this.myVideo.load()
				// this.myVideo.play()
				var type = this.data[this.currentNum].http.slice(this.data[this.currentNum].http.length-3,this.data[this.currentNum].http.length)
				if(type == "mp4" || type == "webm" || type == 'ogg'){
					this.src  =  this.getToken(this.data[this.currentNum].http)
					this.videoTitle = this.data[this.currentNum].name
					this.myVideo.load()
					this.myVideo.play()
				}else{
					this.flage6 = true;
					
					this.transcoding()
				}
			},
			transcoding(){
				var id = this.data[this.currentNum].id;	
				this.videoTitle = this.data[this.currentNum].name;
				this.value2 = 0;
				
				this.src = "";
							console.log(id)
				get("/music/music/video-repaper?id="+id+"").then((res)=>{
					console.log(res)
					this.task_id = res.data.task_id;
					var send_data = {
						task_id:res.data.task_id
					}
					this.sync(send_data);
				})
			},
			sync(send_data){
							// console.log("sync")
							get("/music/music/task-result",send_data).then((res)=>{
								console.log(res.data.source_path.split("upload_file/")[1])
								console.log(res.data)
								if(res.data.state){
									var video = document.getElementById("player");
									
									var url = baseUrl + "/music/download/download-file?file="+res.data.source_path.split("upload_file/")[1]
								  this.src  =  this.getToken(url)
									console.log(this.src)
									this.myVideo.load()
									this.myVideo.play()									
								}else{
									 console.log("转码失败")
								}			
							}).catch( error=>{
								console.log(error.data)
								setTimeout(()=>{
									if(this.task_id == send_data.task_id){								
										this.sync(send_data)								
									}																	
								},200)					
							})
						},
			change(num){
			    // clearInterval(this.bufferedTime)	
					this.myVideo.currentTime=this.time3*num/100;
			     // this.myVideo.load()
				 this.myVideo.play()
				 this.blockWidth = "width:"+ (100-num) + "%";
				 console.log(this.time3*num/100)
				 
				 				 
			},
			getToken(url){
				var token = localStorage.getItem("token")
				var str = "Bearer "+token;
				return url+"&token="+str; 
			},
			change1(num){	
			    if(num==0){
			       this.flage7 = false
			    }else{
			       this.flage7 = true
			    }
				this.myVideo.volume=num/100
			},
			shenyin(){
				var _this = this
				this.flage3 = true
				window.onmousewheel=document.onmousewheel=function(e){
				    	var num = _this.value1
				    	if(e.wheelDelta > 0){
				    		num+=2
				    		if(num<=100){
				    			_this.value1 = num
				    		}else{
				    			_this.value1 = 100
				    		}		    		
				    	}else{
				    		num-=2
				    		if(num<=0){
				    			_this.value1 = 0
				    		}else{
				    			_this.value1 = num
				    		}				    	
				    	}
				    _this.change1(_this.value1)
				    }
			},
			shenyin1(){
				this.flage3 = false
				window.onmousewheel=document.onmousewheel= null;
			},
			shenyin2(){
				console.log(this.value2)
				var num = this.value1;
				if(num<=80){
					this.value1+=20
				}else if(num==100){
					this.value1 = 0
				}else{
					this.value1 = 100
				}
				this.change1(this.value1)
			},
			time(mss,flage){
				var hours = parseInt(mss / 3600);
				var minutes =hours? parseInt(mss % 3600/60) : parseInt(mss/60)>9? parseInt(mss/60):"0"+parseInt(mss/60);
				var seconds = parseInt(mss % 60) > 9 ? parseInt(mss % 60): "0"+parseInt(mss % 60);				
				var str= ""
				
				if(hours){
					str += hours+":"+minutes+":"+seconds
				}else if(minutes){
					str += minutes+":"+seconds
				}else{
					str += "00:"+seconds
				}
				if(flage){
					 this.time3 = mss					
					 this.time2 = str=="0NaN:0NaN"? '00:00':str					 
				}else{	
				   this.time4 = mss
					 this.time1 = str
				}
			},
			detail(){
				
				var type = this.data[this.currentNum].http.slice(this.data[this.currentNum].http.length-3,this.data[this.currentNum].http.length)
				// console.log(type)
				if(type == "mp4" || type == "webm" || type == 'ogg'){
					this.src  = this.getToken(this.data[this.currentNum].http)
					this.videoTitle = this.data[this.currentNum].name
					this.value2 = 0;
					this.blockWidth = "width:100%"
					this.myVideo.load()
					this.myVideo.play()
				}else{
					this.flage6 = true;
					this.transcoding()
				}
				
				
			},
			
			buffered(){
			   var _this = this			  
			   this.bufferedTime = setInterval(function(){
					 
			   var num = _this.myVideo.buffered.length-1
			   var startNum = _this.myVideo.buffered.start(num)
			   var endNum = _this.myVideo.buffered.end(num)
			   var lastNum = _this.time3 - endNum >=0 ? _this.time3 - endNum:endNum
			   
				   if(lastNum==0){			   
				    clearInterval(_this.bufferedTime)
				   } 
				_this.yihuanchun = parseInt((lastNum/_this.time3)*100)
				
				_this.blockWidth = "width:"+parseInt((lastNum/_this.time3)*100)+"%"
				
			   },200)
			},
			goo($event){
			    this.blockDOM = this.$refs.blockDOM.offsetWidth
				console.log(this.blockDOM)
			    var num =parseInt(((this.blockDOM - $event.target.clientWidth + $event.offsetX) / this.blockDOM) * 100)
			    this.value2 = num
			    this.blockWidth = "width:" + ($event.target.clientWidth - $event.offsetX) + "px"
			    this.change(num)			    
			}
		
		},
	
		mounted(){	
      
			console.log(this.data,this.currentNum)
			var _this = this
			var ll = document.querySelector('.videoS')			
					
			this.windowHeight = window.screen.height
			this.windowWidth  = window.screen.width
			this.myVideo = document.querySelector('#video')				
				console.log(document.querySelector('#video').src)
			this.myVideo.addEventListener("ended",function(){
//               _this.flage2 = true 
                  _this.foo7()
            })
			if(JSON.parse(localStorage.getItem('videoPlayList'))){
				// console.log(JSON.parse(localStorage.getItem('videoPlayList')))
				this.data = JSON.parse(localStorage.getItem('videoPlayList')).content
				this.currentNum = JSON.parse(localStorage.getItem('videoPlayList')).currentID
				// this.buffered();
				this.detail();
			}
						
			
			this.myVideo.volume = this.value1/100;			
			  this.myVideo.addEventListener(
				    "timeupdate", 
				    function(event){
				    var num = (this.currentTime/this.duration)*100				     
				      _this.value2 = num				      
				      _this.time(this.duration,true)				      				      
				      _this.time(this.currentTime,false)
				     _this.flage6 = false				     
				    });
		      window.onresize = function() {
		      	setTimeout(function(){
		      	_this.blockDOM = _this.$refs.blockDOM.offsetWidth
		      	  
		      		 var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
                      if (isFull === undefined) isFull = false;
                         if(isFull){
                         	_this.flage5 = false
                         	_this.videoS = "bottom:0;background:rgba(160, 158, 158, 0.51);" 
                         	window.onmousemove = function(){
                         	
                         	    if(_this.flage8){
	                         	      _this.flage = true
	                         	     clearTimeout(_this.Movetime);
	                         	     _this.Movetime = setTimeout(function(){
	                         	        _this.flage = false
	                         	    },2500)	
                         	    }
                     	       
                         	                          	    
                         	}
                         	
                         	ll.onmouseover = function(){
                         	   _this.flage8 = false
                     	          clearTimeout(_this.Movetime)
                     	          _this.flage = true
                         	    } 
                         	ll.onmouseleave = function(){
                         	   _this.flage8 = true                         	   
                         	}
                         }else{
                         	_this.flage5 = true
                         	_this.videoS = "bottom:-50px;background:white;border-bottom-right-radius: 10px;"
                         	window.onmousemove = null
                         	 clearTimeout(_this.Movetime);
                         	_this.flage = true
                         }
		      	},100)               
		      }
		      this.myVideo.addEventListener('waiting',function(){
		        	_this.flage6 = true
		      })		      
		      this.myVideo.addEventListener('play',function(){	
		      	console.log("play")
		      	_this.flage1 = false
		      	_this.flage2 = false
						_this.flage4 = false
// 		      	  setTimeout(function(){
// 		      	      // _this.buffered()
// 		      	  },200)
		      	 
		      	  _this.flage6 = false  
		      })
		    
		    ipcRenderer.on("song",function(event,num){
		    	
		  _this.data = JSON.parse(localStorage.getItem('videoPlayList')).content
			_this.currentNum = JSON.parse(localStorage.getItem('videoPlayList')).currentID
			_this.detail();
			_this.myVideo.load()
			_this.myVideo.play()
			console.log(_this.currentNum)
		    })
		},
		beforeDestroy(){
		    localStorage.removeItem('videoPlayList')
		    clearInterval(this.bufferedTime)
		 
		}
	}
</script>
}
</script>
<style>
	body{
		margin: 0;
		padding: 0;
	}
  #CustomManagement .el-slider__bar{
     background-color: #151515;
  }
  #CustomManagement .el-slider__button{
    border: 1px solid gray;
  }

</style>

<style scoped="scoped">
	#CustomManagement video::-webkit-media-controls-enclosure {
    /*禁用播放器控制栏的样式*/
    display: none !important;
   }
	#CustomManagement{
		display: flex;
		flex-direction: column;
		height:100vh;
		background: white;	
		border: 1px solid black;
		box-sizing: border-box;			
	}
	.slide-fade-enter-active {
	  transition: all .8s ease;
	}
	.slide-fade-leave-active {
	  transition: all .8s ease;
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  transform: translateY(50px);
	  
	}
	.isquping{
	  color: white;
	}
	.notquping{
	  color: black;
	}
	.video1{
		width: 100%;
		height: 100%;
	}
	.video2{
		cursor: none;
	}
	video{
		margin: 0;
		padding: 0;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
	}
	.CustomManagement_a{
		flex: 1;
		height: 100%;		
		position: relative;	
		background: black;	
				
	}
	.block_M{
	   display: block;
	   height: 6px;
	   width:100%;
	   background:rgba(0, 0, 0, 0.51);
	   position: absolute;
	   right: 0;
	   top: 24px;
	   cursor: pointer;
	   border-top-right-radius: 5px;
       border-bottom-right-radius: 5px;
	}
	#CustomManagement .videobofang{
		
		font-size: 30px;
		cursor: pointer;
		
	}
	#CustomManagement .videobofang:hover{
		
		text-shadow: 0px -2px 20px white;
	}
	#CustomManagement .videoS{
		display: flex;
		height: 50px;
		width: 100%;
		
		position: absolute;
		left: 0;
		bottom: -50px;		
		z-index:317483647;		
	}
	.videoM{
		display: block;
		width:100%;
		height: 100%;
		position: absolute;
		background: rgba(0, 0, 0, 0.51);
		display: flex;
		justify-content: center;
		align-items: center;		
		left: 0;
		top: 0;
		z-index: 15;
	}
</style>