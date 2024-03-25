// import { handleAxiosError, handleBackendError, handleResponseError, handleServiceResult } from '../helpers';

import { handleUniRequestError, handleServiceResult } from "../helpers";

class ZNRequest {
  // 该属性从实例中获取
  interceptors: Service.Interceptors;

  // 后端数据字段配置
  backendConfig: Service.BackendResultConfig;

  constructor(
    interceptors: Service.Interceptors,
    backendConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'message',
      successCode: 200
    }
  ) {
    this.interceptors = interceptors;
    this.backendConfig = backendConfig;
  }

  async request<T = any>(option: UniApp.RequestOptions) {
    let resOption = option;
    if (this.interceptors?.requestInterceptor) {
      resOption = await this.interceptors.requestInterceptor(option); // 请求拦截
    }
    return new Promise<Service.SuccessResult<T>>((resolve, reject) => {
      // 开启loading
      const loadingTimeout = setTimeout(() => {
        uni.showLoading({
          title: '加载中...'
        });
      }, 1000);

      uni.request({
        ...resOption,
        success(res) {
          let result = res;
          if (this.interceptors?.responseInterceptor) {
            // 异步拦截
            result = this.interceptors.responseInterceptor(res, this.backendConfig);
          }
          resolve(result as unknown as Service.SuccessResult<T>);
        },
        fail(err) {
					const error = handleUniRequestError(err);
        	const result = handleServiceResult(error, null);
          reject(result);
        },
        complete() {
          clearTimeout(loadingTimeout);
          uni.hideLoading();
        }
      });
    });
  }

  // upload(tmpFilePath) {
  //   return new Promise((resolve, reject) => {
  //     uni.uploadFile({
  //       url: `${this.base_url}/img/uploadPictures`,
  //       // url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
  //       filePath: tmpFilePath,
  //       name: 'file',
  //       formData: {
  //         user: 'test'
  //       },
  //       success: res => {
  //         const result = JSON.parse(res.data);
  //         resolve(result.Data);
  //       }
  //     });
  //   });
  // }
}

export { ZNRequest };
