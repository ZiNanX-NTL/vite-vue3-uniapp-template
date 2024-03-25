import { ZNRequest } from "../request";
import {
	transformRequestData,
	handleServiceResult,
	handleBackendError,
	handleResponseError,
} from "../helpers";

export const requestInstance = new ZNRequest({
	async requestInterceptor(config) {
		console.log("实例请求拦截");
		const handleConfig = { ...config };
		if(handleConfig.header) {
			// 数据转换
			const contentType = handleConfig.header["Content-Type"];
			handleConfig.data = await transformRequestData(handleConfig.data, contentType);
		}
		// 1. 非 http 开头需拼接地址
		if (!handleConfig.url.startsWith("http")) {
			handleConfig.url = import.meta.env.VITE_SERVER_BASEURL + handleConfig.url;
		}
		// 2. 请求超时
		handleConfig.timeout = 10000; // 10s
		// 3. 添加小程序端请求头标识
		handleConfig.header = {
			platform: "mp-weixin", // 可选值与 uniapp 定义的平台一致，告诉后台来源
			...handleConfig.header,
		};
		// 4. 添加 token 请求头标识
		// const userStore = useUserStore()
		// const { token } = userStore.userInfo as unknown as IUserInfo
		// if (token) {
		//   handleConfig.header.Authorization = `Bearer ${token}`
		// }
		return handleConfig;
	},
	responseInterceptor(response, backendConfig) {
		console.log("实例请求拦截");
		const { statusCode } = response;
		if (statusCode === 200 || statusCode < 300 || statusCode === 304) {
			const backend = response.data as Record<string, any>;
			const { codeKey, dataKey, successCode } = backendConfig;
			// 请求成功
			if (backend[codeKey] === successCode) {
				return handleServiceResult(null, backend[dataKey]);
			}

			const error = handleBackendError(backend, backendConfig);
			return handleServiceResult(error, null);
		}
		const error = handleResponseError(response);
		return handleServiceResult(error, null);
	},
});
