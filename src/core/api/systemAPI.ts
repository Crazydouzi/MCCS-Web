import { apiType } from "./apiLib.dto";
const baseUrl = "http://localhost:8080/api"
export const systemAPI:apiType={
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
}
