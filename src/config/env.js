/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgCode： 图片验证码地址
 *
 */
let baseUrl;
let routerMode;
let imgCode;
let path

if (process.env.NODE_ENV == 'development') {
  baseUrl = ''
  routerMode = 'hash'
  imgCode = 'http://hpweb.qisheng.me/api/code'
  path = '//test-wechat.letulife.com'
}else{
  baseUrl = ''
  routerMode = 'hash'
  imgCode = '/api/code'
  //path ='//wechat.letulife.com'
  path = ''
}

export {
  baseUrl,
  routerMode,
  imgCode,
  path
}
