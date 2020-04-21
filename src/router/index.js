import Vue from 'vue'
import VueRouter from 'vue-router'

import { judgeLogin } from "@/utils/login.js"
import shopping from "./shopping.js"
import { domain } from "@/utils/util.js"

Vue.use(VueRouter)

const config = new VueRouter({
	mode: 'history',
	base: '/home/',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}

		return {x: 0, y: 0}
	},
	routes: [
		...shopping
	]
})


// 路由全局钩子函数
// 处理问题 通过user_id判断是否登陆，如未登陆则跳转登陆组件，否则继续执行

config.beforeEach((to, from, next) => {
	
	if (from.fullPath === '/') {
		Vue.prototype.$iosFullPath = `${domain}${to.fullPath}`
	}

	judgeLogin(to, from, next, config.app);
})

config.afterEach((to) => {
	const { meta: { title } } = to;
	window.document.title = title;
})

export default config
