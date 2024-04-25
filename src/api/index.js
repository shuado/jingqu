// axios封装
import axios from 'axios'
import { BASE_URL, TIME_OUT } from '@/config/api'
import router from '@/router/index'
import { Message } from '@arco-design/web-vue'
import { GlobalStore } from '@/stores/modules/global'
import { useMenuStore } from '@/stores/modules/menu'

// 请求集合
let cancel,
  promiseArr = {}
// 取消请求
const CancelToken = axios.CancelToken
const source = CancelToken.source()
// 设置请求时间
axios.defaults.timeout = TIME_OUT

// 请求拦截
axios.interceptors.request.use(
  config => {
    config.cancelToken = source.token // 全局添加cancelToken
    // 判读请求列表中是否存在相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }

    if (config.url.indexOf(BASE_URL) < 0) {
      if (config.prefixBaseUrl) {
        config.url = BASE_URL + config.prefixBaseUrl + config.url
      } else if (config.url.indexOf('http') < 0) {
        // 拼接请求地址或域名
        config.url = BASE_URL + config.url
      }
    }

    // 获取要带入的后台参数
    let globalStore = GlobalStore()
    let token = globalStore.token
    // 设置头文件
    config.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
      Authorization: token
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)
let timeOue = null
// 拦截器响应处理
axios.interceptors.response.use(
  res => {
    let globalStore = GlobalStore()
    let menuStore = useMenuStore()

    if (globalStore.token && res.config.url.indexOf('/accounts/signOut') < 0) {
      timeOue ? clearTimeout(timeOue) : ''
      timeOue = setTimeout(() => {
        localStorage.setItem('TIMEOUT_TIME', new Date().getTime())
      }, 500)
    }

    let { code, msg, data } = res.data

    // 验证码code 为空
    if (code === undefined) {
      return res
    }

    if (code === 401) {
      Message.error(msg)
      globalStore.clearUser()
      menuStore.setCurrentBar('')
      setTimeout(() => {
        router.replace({ path: '/login' })
        location.reload()
      }, 100)
      return
    }
    // 请求数据失败
    if (code !== 0 && code !== 200 && code !== 1) {
      Message.error({ id: code, content: data || msg })
    }

    // 返回响应结果
    if (res) {
      return res
    }
  },
  err => {
    let globalStore = GlobalStore()
    let menuStore = useMenuStore()
    // 错误请求
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          globalStore.clearUser()
          menuStore.setCurrentBar('')
          setTimeout(() => {
            router.replace({ path: '/login' })
            // location.reload();
          }, 100)
          err.message = '未授权，请重新登录！'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源！'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接到服务器失败`
      }
    } else {
      err.message = '连接到服务器失败'
    }

    if (err && err.response) {
      Message.error({ id: err.response.status, content: err.message })
    }

    return Promise.reject(err)
  }
)

//get请求方式
function get(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: 'get',
      prefixBaseUrl: config.prefixBaseUrl,
      params: config.data,
      headers: config.headers
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//get请求方式
function getcode(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: 'get',
      prefixBaseUrl: config.prefixBaseUrl,
      params: config.data,
      headers: config.headers,
      responseType: 'arraybuffer'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//post请求方式
function post(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: 'post',
      prefixBaseUrl: config.prefixBaseUrl,
      data: config.data,
      headers: config.headers
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 文件下载请求
function downloadPost(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: 'post',
      data: config.data,
      prefixBaseUrl: config.prefixBaseUrl,
      headers: config.headers,
      responseType: 'blob'
    })
      .then(res => {
        const typeCount = {
          type: 'application/json'
        }
        let blob = new Blob([res.data], typeCount)
        // 判断返回的数据格式  如果是JSON 则弹出警告
        if (res.data.type === typeCount.type) {
          const fileReader = new FileReader()
          fileReader.readAsText(blob, 'utf-8')
          fileReader.onload = function () {
            let msg = JSON.parse(fileReader.result).msg
            resolve(false)
            return Message.error(msg)
          }
        } else {
          resolve(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 文件下载请求
function downloadGet(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: 'get',
      params: config.data,
      prefixBaseUrl: config.prefixBaseUrl,
      headers: config.headers,
      responseType: 'blob'
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//put请求方式
function put(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: 'put',
      prefixBaseUrl: config.prefixBaseUrl,
      headers: config.headers,
      data: config.data
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

//deleted请求方式
function deleted(config) {
  return new Promise((resolve, reject) => {
    axios({
      url: config.url,
      method: 'delete',
      prefixBaseUrl: config.prefixBaseUrl,
      headers: config.headers,
      data: config.data
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  get,
  post,
  downloadPost,
  downloadGet,
  put,
  deleted,
  getcode
}
