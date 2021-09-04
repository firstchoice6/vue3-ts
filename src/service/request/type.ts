import { AxiosRequestConfig, AxiosResponse } from "axios"
interface RequestInterceptors {
	requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
	requestInterceptorsCatch?: (error: any) => any
	responseInterceptors?: (res: AxiosResponse) => AxiosResponse
	responseInterceptorsCatch?: (error: any) => any
}

interface RequestConfig extends AxiosRequestConfig {
	interceptor?: RequestInterceptors
	needLoading?: boolean
}

export { RequestConfig, RequestInterceptors }
