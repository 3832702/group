import axios from 'axios'
import Qs from "qs"
import Vue from 'vue'

if (process.env.NODE_ENV === 'production') {
	axios.defaults.baseURL = 'https://admin.nineopen.com/'
}

axios.defaults.baseURL = 'https://admin.nineopen.com/'

// request拦截器
axios.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

//response 拦截器
axios.interceptors.response.use(
  response => {
		const { data, data: { status, message } } = response;

		// 根据返回状态判断是否出错
		if (status === 0) {
			return Promise.resolve(data);
		} else {
			Vue.prototype.$toast({
				message,
				forbidClick: true,
				duration: 2000
			});
			return Promise.reject(message)
		}
  },
  error => {
    return Promise.reject(error)
  }
)

//axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
//"Content-Type": "application/json"

axios.defaults.transformRequest = function(data) {
	return Qs.stringify(data, {arrayFormat: 'indices'})
}

export const fetch = function(url, params = {}, headers = {}) {
	return new Promise((resolve, reject) => {
		axios.get(
			url,
			{
				params,
				headers,
				paramsSerializer(params) {
					return Qs.stringify(params, {arrayFormat: 'indices'})
				}
			}
		)
			.then(res => {
				resolve(res.data ? res.data: res)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export const post = function(url, data = {}, headers = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data, { headers })
			.then(res => {
				resolve(res.data ? res.data: res)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export const put = function(url, data = {}, headers = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data, { headers })
			.then(res => {
				resolve(res.data ? res.data: res)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export const remove = function(url, params = {}, headers = {}) {
	return new Promise((resolve, reject) => {
		axios.delete(url, { data: {...params}, headers })
			.then(res => {
				resolve(res.data ? res.data: res)
			})
			.catch(err => {
				reject(err)
			})
	})
}
