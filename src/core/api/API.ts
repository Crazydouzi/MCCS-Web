import { apiType } from "./apiLib.dto";
const APIUrl = "http://localhost:8080/api"
const WSUrl= "http://localhost:8080/ws"
export const serverAPI: apiType = {
  openServer: {
    url: APIUrl + "/server/start", method: "POST"
  },
  closeServer: {
    url: APIUrl + "/server/stop", method: "POST"
  },
  modifyServerConfig: {
    url: APIUrl + "/server/modifyServerOption", method: "POST"
  },
  modifyServerInfo: {
    url: APIUrl + "/server/modifyServerInfo", method: "POST"
  },
  getSetting: {
    url: APIUrl + "/server/getSettingList", method: "POST"
  },
  getStatus: {
    url: APIUrl + "/server/status", method: "GET"
  },
  getServerList: {
    url: APIUrl + "/version/list", method: "GET"
  }
} as const;
export const versionAPI:apiType={
  enableServerInfo:{
    url: APIUrl + "/version/enableServerInfo",
    method: 'GET'
  }
}
export const systemAPI: apiType = {
  getCpuUsage: {
    url: APIUrl + "/system/getCpuUsage",
    method: 'POST'
  },
  getSystemInfo: {
    url: APIUrl + "/system/getInfo",
    method: 'POST'
  },
  getMemUsage: {
    url: APIUrl + "/system/getMemUsage",
    method: 'POST'
  },
  usageInfoWS:{
    url:WSUrl+"/system/usage/",
    method:'WS'
  }


} as const;
export const userAPI: apiType = {
  login: {
    url: APIUrl + "/user/userLogin",
    method: 'POST'
  },
} as const;

