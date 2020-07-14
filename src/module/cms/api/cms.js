import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询方法
export const page_list = (page,size,params) => {
  //参数请求是?加在url后面，所以json转成keyvalue串,记得加"?"
  let kvString = querystring.stringify(params);
  return http.requestQuickGet(apiUrl + "/cms/page/list/" + page + "/" + size + "?" + kvString);
}

//新建页面
export const page_add = (params) => {
  return http.requestPost(apiUrl + "/cms/page/add",params)
}
