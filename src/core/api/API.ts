import { apiType } from "./apiLib.dto";
const APIUrl = "http://localhost:8080/api"
const WSUrl = "http://localhost:8080/ws"

export const serverAPI: apiType = {
  openServer: {
    url: APIUrl + "/server/start", method: "POST"
  },
  closeServer: {
    url: APIUrl + "/server/stop", method: "POST"
  },
  getServerInfo: {
    url: APIUrl + "/server/getServerInfo", method: "GET"
  },
  modifyServerConfig: {
    url: APIUrl + "/server/modifyServerOption", method: "POST"
  },
  modifyServerInfo: {
    url: APIUrl + "/server/modifyServerInfo", method: "POST"
  },
  getSetting: {
    url: APIUrl + "/server/getSetting", method: "GET"
  },
  getStatus: {
    url: APIUrl + "/server/status", method: "GET"
  },
  getConfigList: {
    url: APIUrl + "/server/getConfigList", method: "GET"
  },
  getConfig: {
    url: APIUrl + "/server/readConfig", method: "GET"
  },
  getPluginList: {
    url: APIUrl + "/server/getPluginList", method: "GET"
  },
  setEnablePlugin: {
    url: APIUrl + "/server/enablePlugin", method: "POST"
  },
  setDisablePlugin: {
    url: APIUrl + "/server/disablePlugin", method: "POST"
  },
  deletePlugin: {
    url: APIUrl + "/server/deletePlugin", method: "DELETE"
  }

} as const;
export const versionAPI: apiType = {
  enableServerInfo: {
    url: APIUrl + "/version/enableServerInfo",
    method: 'GET'
  },
  getServerList: {
    url: APIUrl + "/version/list", method: "GET"
  },
  installRemoteMCServer: {
    url: APIUrl + "/version/installRemoteMCServer", method: "POST"

  },
  mcServerUpload: {
    url: APIUrl + "/version/mcServerUpload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    }
  },

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
  usageInfoWS: {
    url: WSUrl + "/system/usage/",
    method: 'WS'
  }


} as const;
export const userAPI: apiType = {
  login: {
    url: APIUrl + "/user/userLogin",
    method: 'POST'
  }, logout: {
    url: APIUrl + "/user/userLogout",
    method: 'POST'
  },
} as const;

