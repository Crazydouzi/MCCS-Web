import { apiType } from "./apiLib.dto";
const baseUrl = "http://localhost:8080/api"
export const serverAPI:apiType = {
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
  getStatus:{
    url:baseUrl+"/server/status",method:"POST"
  }
}
