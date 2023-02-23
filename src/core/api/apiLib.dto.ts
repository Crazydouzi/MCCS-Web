type Method =
  | 'GET'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'LINK'
  | 'UNLINK'

export interface baseApiOption {
  url: string
  method: Method
  headers?: {
    [K: string]: string
  }
}

export class apiType {
  [K: string]: baseApiOption
}
