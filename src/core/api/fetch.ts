class API {
  private baseOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    keepalive: true, //保证数据连续性
    cache: "no-cache", //请求缓存比较
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
  private  paramsSerializer(params?: Record<string, string | number | boolean | undefined>): string {
    //{k:v, k2:v2...} => k=v&k2=v2...
    let parts: string[] = [];
    Object.keys(params).forEach((k) => {
      parts.push(this.encode(k) + '=' + this.encode(params[k].toString()))
    })
    return parts.join('&')
  }
  public async request(urlObject: object, data?: Record<string, string | number | boolean>) {
    let options = this.baseOptions;
    let url = urlObject["url"]
    if ("headers" in urlObject) {
      options["headers"] = urlObject["headers"]
    }
    if (data) {
      if (urlObject["method"] == 'GET' || urlObject["method"] == 'DELETE') {
        //GET请求将body转为params
        url = url + '?' + this.paramsSerializer(data)
      } else {
        options['body'] = JSON.stringify(data)
      }
    }
    options["method"] = urlObject["method"]
    const res = await fetch(url, options);
    if (res.status >= 200 && res.status <= 300) {
      return res.json()

    }
    else {
      throw new Error("[API Request]Network error: " + res.statusText)
    }
  }
}
export default new API()
