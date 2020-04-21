import { authorization, login } from "@/server/index.js"
import { domain } from "@/utils/util.js"

/**
 * [authorization 授权]
 * @return {[type]} [description]
 */
const auth = async function(path) {
		try {
			const data = await authorization(path);
			window.location.replace(data);
			this.$iosFullPath = data
		}catch(err) {
			console.log('错误', err)
		}
}

/**
 * [login 登录]
 * @param  {[String]} code [description]
 * @return {[type]}      [description]
 */
const logincode = async function(data, save) {

	try {
		const { unionid, openid } = await login(data);
		save('unionid', { unionid, openid }, 5)
	}catch(err) {
		console.log('错误提示', err)
	}
}

/**
 * [login 控制登录]
 * @param  {[Object]} to [要进入的路由对象]
 * @param  {[Object]} from [即将离开的路由对象]
 * @param  {[Function]} next [控制跳转]
 * @param  {[Number]} skip [控制按钮  1 掌柜页 点击关注  2 掌柜页  点击拉黑   3商品页 点击收藏]
 * @return {[type]}      [description]
 */
export const judgeLogin = async function(to, from, next, context, skip) {

	if (to.matched.some(item => item.meta.is_login)) {

		let { query: { code }, fullPath } = to;
		const { $local: { fetch, save } } = context;

		let data = fetch('unionid')
		let { unionid } = data ? JSON.parse(data): { unionid: '' };

		code = code || unionid
		let path = skip ? `${domain}${skip}`: `${domain}${fullPath}`

		if (!code) {
      auth(path);
			return;
    }

		if (!!code && !unionid) {
			await logincode({ code }, save);
			({ unionid } = JSON.parse(fetch('unionid')));
		}

		next();
	} else {
		next()
	}
}
