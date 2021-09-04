import Request from "./request"
import { TIME_OUT, Base_URL } from "./request/config"
const req = new Request({
	baseURL: Base_URL,
	timeout: TIME_OUT,
	interceptor: {
		requestInterceptors: (config) => {
			console.log("请求拦截")
			config.headers.Authorization = "token"
			return config
		},
		requestInterceptorsCatch: (err) => {
			console.log("请求失败的拦截")
			return err
		},
		responseInterceptors: (config) => {
			console.log("响应拦截")
			return config.data
		},
		responseInterceptorsCatch: (err) => {
			console.log("响应失败的拦截")
			return err
		}
	}
})
export { req }
