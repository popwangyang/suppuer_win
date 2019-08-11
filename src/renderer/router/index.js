import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: require('@/components/SignIn').default
    },
    {
    	path:'/Main',
    	name:'Main',
    	redirect:'/LibraryManagement',
    	component: require('@/components/Main').default,
    	children:[
    	    {
    	    	path:'/LibraryManagement',
    	    	name:'LibraryManagement',
				meta: {keepAlive: false},
    	    	component: require('@/components/LibraryManagement/page1').default,
    	    },			    
    	    {
    	    	path:"/editPage",
    	    	name:'editPage',
				meta: {keepAlive: false},
    	    	component: require("@/components/LibraryManagement/page3").default
    	    },
    	    {
    	    	path:'/CustomManagement',
    	    	name:'CustomManagement',
				meta: {keepAlive: false},
    	    	component: require('@/components/CustomManagement/page1').default
    	    },
    	    {
    	    	path:'/SongsUploaded',
    	    	name:'SongsUploaded',
				meta: {keepAlive: false},
    	    	component: require('@/components/SongsUploaded').default
    	    },
			{
				path:'/Video',
				name:'Video',
				meta: {keepAlive: false},
				component: require('@/components/Video').default
			},
    	    {
    	    	path:'/Uploading',
    	    	name:'Uploading',
				meta: {keepAlive: false},
    	    	component: require('@/components/Uploading').default
    	    },
    	    {
    	    	path:'/Refresh',
    	    	name:'Refresh',
    	    	component: require('@/components/Refresh').default
    	    },
			{
				path:'/404',
				name:'404',
				component: require('@/components/404').default
			}
    	]
    },
    {
      path: '*',
      redirect: '/'
    },
    {
       path: '/backGround',
       name: 'backGround',
	   component: require('@/components/backGround').default
    }
  ]
})
