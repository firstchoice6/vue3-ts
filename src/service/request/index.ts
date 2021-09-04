import axios, { AxiosInstance } from "axios"
import type { RequestConfig, RequestInterceptors } from "./type"

import { ElLoading, ILoadingInstance } from "element-plus"
class Request {
	instance: AxiosInstance
	interceptor?: RequestInterceptors
	loading?: ILoadingInstance
	needLoading: boolean

	constructor(config: RequestConfig) {
		this.instance = axios.create(config)

		this.interceptor = config.interceptor

		// 默认显示loading
		this.needLoading = config.needLoading ?? true

		this.instance.interceptors.request.use(
			this.interceptor?.requestInterceptors,
			this.interceptor?.requestInterceptorsCatch
		)

		this.instance.interceptors.response.use(
			this.interceptor?.responseInterceptors,
			this.interceptor?.responseInterceptorsCatch
		)

		// 所有实例都有的拦截器
		this.instance.interceptors.request.use(
			(config) => {
				console.log("全局请求拦截")
				if (this.needLoading) {
					this.loading = ElLoading.service({
						lock: true,
						text: "正在请求..."
					})
				}
				return config
			},
			(err) => {
				console.log("全局请求失败拦截")
				return err
			}
		)
		this.instance.interceptors.response.use(
			(res) => {
				console.log("全局响应拦截")
				// 停止loading
				setTimeout((_) => {
					this.loading?.close()
				}, 200)

				const { data } = res
				if (data.code !== 200) {
					console.log("请求失败")
				} else {
					return res
				}
			},
			(err) => {
				console.log("全局响应失败拦截")

				setTimeout((_) => {
					this.loading?.close()
				}, 200)

				switch (err.response.status) {
					case 404:
						console.log("404")
						break

					default:
						break
				}
				return err
			}
		)
	}
	request<T>(config: RequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			this.instance
				.request<any, T>({ ...config, method: "GET" })
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
	get<T>(config: RequestConfig): Promise<T> {
		return this.request({ ...config, method: "GET" })
	}
	post<T>(config: RequestConfig): Promise<T> {
		return this.request({ ...config, method: "POST" })
	}
	put<T>(config: RequestConfig): Promise<T> {
		return this.request({ ...config, method: "PUT" })
	}
	delete<T>(config: RequestConfig): Promise<T> {
		return this.request({ ...config, method: "DELETE" })
	}
}

export default Request
