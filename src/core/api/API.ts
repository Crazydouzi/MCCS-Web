import { apiType } from "./apiLib.dto";
const baseUrl = "http://localhost:8080/api"
export const serverAPI: apiType = {
  openServer: {
    url: baseUrl + "/server/start", method: "POST"
  },
  closeServer: {
    url: baseUrl + "/server/stop", method: "POST"
  },
  modifyServerConfig: {
    url: baseUrl + "/server/modifyServerOption", method: "POST"
  },
  modifyServerInfo: {
    url: baseUrl + "/server/modifyServerInfo", method: "POST"
  },
  getSetting: {
    url: baseUrl + "/server/getSettingList", method: "POST"
  },
  getStatus: {
    url: baseUrl + "/server/status", method: "POST"
  },
  getServerList: {
    url: baseUrl + "/version/list", method: "POST"
  }
} as const;
export const systemAPI: apiType = {
  getCpuUsage: {
    url: baseUrl + "/system/getCpuUsage",
    method: 'POST'
  },
  getSystemInfo: {
    url: baseUrl + "/system/getInfo",
    method: 'POST'
  },
  getMemUsage: {
    url: baseUrl + "/system/getMemUsage",
    method: 'POST'
  }
} as const;
export const userAPI: apiType = {
  login: {
    url: baseUrl + "/user/userLogin",
    method: 'POST'
  },
} as const;

