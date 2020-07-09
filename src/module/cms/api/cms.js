import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询方法
export const page_list = (page,size,params) => {
  return http.requestQuickGet("http://localhost:31001/cms/page/list/" + page + "/" + size);
}
