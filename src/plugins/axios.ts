import Axios from "axios"
const baseUrl = "http://localhost:8080"
const baseApiUrl = baseUrl + '/api'
// const wsUrl=baseUrl+'/ws'
const apiUrl = {
  userLogin: baseApiUrl + "/user/userLogin",
  logout: baseApiUrl + "/user/userLogout",
  modifyUser: baseApiUrl + "/user/userUpdate",

  // 服务器管理部分
  openServer: baseApiUrl + "/server/start",
  closeServer: baseApiUrl + "/server/stop",
  modifyServerConfig: baseApiUrl + "/server/modifyServerOption",
  modifyServerInfo: baseApiUrl + "/server/modifyServerInfo",
  getSetting: baseApiUrl + "/server/getSettingList",

  //服务器版本管理
  changeVersion: baseApiUrl + "/version/changeVersion",
  scanVersion: baseApiUrl + "/version/scanVersion",
  serverList: baseApiUrl + "/version/list",
  getEnableServer: baseApiUrl + "/version/enableServerInfo",

  //系统信息
  getCpuUsage: baseApiUrl + "/system/getCpuUsage",
  getSystemInfo: baseApiUrl + "/system/getInfo",
  getMemUsage: baseApiUrl + "/system/getMemUsage"
}

class API {
  private defaultHeaders={
    'Content-Type': 'application/json;charset=UTF-8'
  }
  get<T>(url: string, params?: object) {
    return Axios.get(url, params)
  }
  post<T>(url: string, headers?: object, data: object={}) {
    if (headers == null) {
      headers = this.defaultHeaders;
    }
    return Axios({
      method: 'post',
      url,
      data,
      headers
    })
  }
  put<T>(url: string, headers?: object, data: object={}) {
    if (headers == null) {
      headers= this.defaultHeaders;
    }
    return Axios.put(url, data, headers);
  }
  delete<T>(url: string, data: object={}) {
    return Axios.delete(url, data);
  }
}

export default new API();
export const $url = apiUrl;
export const $api = new API();
