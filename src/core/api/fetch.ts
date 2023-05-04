class API {
  private baseOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    keepalive: true, //保证数据连续性
    cache: "no-cache", //请求缓存比较
    credentials:'include',//发送cookie session等信息
    mode:"cors"
  }
  private encode(val: string): string {
    return encodeURIComponent(val).
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']')
  }
  private paramsSerializer(params?: Record<string, string | number | boolean | undefined | object>): string {
    //{k:v, k2:v2...} => k=v&k2=v2...
    let parts: string[] = [];
    Object.keys(params).forEach((k) => {
      parts.push(this.encode(k) + '=' + this.encode(params[k].toString()))
    })
    return parts.join('&')
  }
  public async request(urlObject: object, data?: Record<string, any>) {
    let options = Object.assign({}, this.baseOptions);
    let url = urlObject["url"]
    if ("headers" in urlObject) {
      options.headers = <HeadersInit>urlObject["headers"]
    }
    if("credentials" in urlObject){
      options.credentials = <RequestCredentials>urlObject["credentials"]
    }
    if (data) {
      if (urlObject["method"] == 'GET' || urlObject["method"] == 'DELETE') {
        //GET请求将body转为params
        url = url + '?' + this.paramsSerializer(data)
      } else {
        options['body'] = JSON.stringify(data)
      }
      if (options.headers['Content-Type'] == 'multipart/form-data') {
        options.headers = undefined
        const formData = new FormData();
        Object.keys(data).forEach((k) => {
          if (data[k] instanceof File) {
            formData.append(k, data[k])

          } else {
            formData.append(k, JSON.stringify(data[k]))
          }
        })
        options['body'] = formData
      }
    }

    options["method"] = urlObject["method"]
    const res = await fetch(url, options);
    if (res.status >= 200 && res.status <= 300) {
      const data=res.json()
      return data
    }
    else if (res.status==405) {
      sessionStorage.clear();
      location.reload();
      alert("权限认证失败！请重新登录！")
    }
    else {
      throw new Error("[API Request]Network error: " + res.statusText)
    }
  }
}
export default new API()
