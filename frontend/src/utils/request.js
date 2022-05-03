import axios from 'axios'
import Qs from 'qs'
import Config from '@/settings'
// import { message as Message } from '@/utils/Message'
// import { url as userUrl } from '@/api/user'
axios.defaults.retry = 0 // 请求失败后重试次数
axios.defaults.withCredentials = false // false不跨域  true跨域

export default function ({ url, method = 'GET', params = '', data = '', headerType = 'application/json', responseType = 'json' }) {
  const baseURL = process.env.VUE_APP_BASE_API

  // post请求
  if (method === 'post' || method === 'POST') {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (headerType === 'multipart/form-data') {
      axios.defaults.headers['Content-Type'] = 'multipart/form-data'
    }
  }

  // get请求
  if (method === 'get' || method === 'GET') {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (headerType === 'multipart/form-data') {
      axios.defaults.headers['Content-Type'] = 'multipart/form-data'
    }
    if (params !== '') {
      params = Qs.stringify(params)
      url = url + '?' + params
      params = ''
    }
  }

  // put请求
  if (method === 'put' || method === 'PUT') {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
    if (headerType === 'multipart/form-data') {
      axios.defaults.headers['Content-Type'] = 'multipart/form-data'
    }
    if (params !== '') {
      url = url + '/' + params
      params = ''
    }
  }
  // 其他类型请求按需求自行添加

  // 请求拦截
  axios.interceptors.request.use(
    (config) => {
      // startLoading()
      // if (Cookies.get(Config.TokenKey)) {
      //   // let each request carry token
      //   // ['X-Token'] is a custom headers key
      //   // please modify it according to the actual situation
      //   config.headers['LOGIN_USER'] = getToken()
      // }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  axios.interceptors.response.use(
    (response) => {
      // endLoading()
      // if (response.headers[Config.TokenHeader]) {
      //   store.commit('user/SET_TOKEN', response.headers[Config.TokenHeader])
      // }
      // const res = response.data;
      // if (res.code !== 200 && response.config.url !== userUrl.logout) {
      //   Message.error(res.msg || res.message || 'Error');
      //   return response;
      // } else {
      //   return response;
      // }
      return response
    },
    (error) => {
      // if (error.response.data.code === 500) {
      //   Message.error(error.response.data.message || error.response.data.msg || 'Error');
      // }
      // Message.error(error.msg || error.message || 'Error')
      // endLoading()
      return Promise.resolve(error)
    }
  )

  // 发送请求
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      baseURL,
      params,
      data,
      responseType,
      timeout: Config.timeout,
    })
      .then((result) => {
        if (result.config.responseType === 'blob') {
          resolve(result)
        } else {
          resolve(result.data)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
