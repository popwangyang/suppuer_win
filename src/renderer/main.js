import Vue from 'vue'

import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import db from './libs/datastore'
import './assets/font/iconfont.css'
import './assets/font1/iconfont.css'

// import "./assets/style.css"
Vue.use(ElementUI);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$db = db
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.directive('tishi',{
		inserted:function(el,binding){
			var box;
			var time;
			el.onmousemove=function(e){
				clearTimeout(time)
				time = setTimeout(function(){
				var evt = e || event;
				console.log(binding.arg)
				var num = binding.arg
				el.style.position='relative';
				    box = document.createElement('div')
				var p=document.createElement('p')
				    p.innerHTML=binding.value
				    box.style.border='1px solid #797979';
				    box.style.borderRadius = '2px';
				    p.style.width=num+"px";
				    p.style.fontSize = 12+"px";
				    p.style.margin = 0+ "px";
				    p.style.padding = 0 + "px";
				    p.style.color = '#575757';
				    p.style.textAlign = 'center';
				    box.style.background = '-webkit-linear-gradient(#ffffff, #e4e5f0)';
				    p.style.height = 22 +"px";
				    p.style.lineHeight = 22 + "px";
				    box.style.position = 'fixed';
				    box.style.zIndex = 33333333;
				    box.style.left = e.clientX +"px";
				    box.style.top = e.clientY +24+ 'px';
				    box.appendChild(p)
				    document.body.appendChild(box)
				},1000)
			}
			el.onmouseleave=function(){
				 clearTimeout(time)
				if(box){
					console.log(box)
					document.body.removeChild(box)
					box=""
				}					
			}
			el.oncontextmenu=function(){
				 clearTimeout(time)
				if(box){
					console.log(box)
					document.body.removeChild(box)
					box=""
				}	
			}
			el.onclick=function(){
				 clearTimeout(time)
				 if(box){
					console.log(box)
					document.body.removeChild(box)
					box=""
				}
			}
		}		
	})
// var devInnerHeight = 1080.0 // 开发时的InnerHeight
// var devDevicePixelRatio = 1.0// 开发时的devicepixelratio
// var devScaleFactor = 1.3 // 开发时的ScaleFactor
// var scaleFactor = require('electron').screen.getPrimaryDisplay().scaleFactor
// var zoomFactor = (window.innerHeight / devInnerHeight) * (window.devicePixelRatio / devDevicePixelRatio) * (devScaleFactor / scaleFactor)
// require('electron').webFrame.setZoomFactor(zoomFactor)
new Vue({
	data:{
		Bus: new Vue()
	},
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
