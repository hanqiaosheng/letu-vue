import axios from 'axios'
axios.defaults.headers.common['platformtype'] = 'app';

const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}
const getCookie = name => {
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
let token = getCookie('token')
let fromFlag = 2  //微信端:2 APP:1
if(getStore('platform')=='h5'){
  fromFlag = 2
}else{
  fromFlag = 1
}
let hearder = {'fromFlag':fromFlag,'token':token}
/**
 * 创建临时数据
 */
const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}


var getPointJson = (rentInfoId) => axios.post( '/orbit/getPointJson.action', `rentInfoId=${rentInfoId}`,{headers:{'content-type':'application/x-www-form-urlencoded'}})

/*景点列表*/
var scenicList = (pageIndex,cityCode,lng,lat) => axios.post( '/scenicspot/scenicList.action', `pageIndex=${pageIndex}&cityCode=${cityCode}&lng=${lng}&lat=${lat}`)

/*首页banner*/
var bannerList = (cityCode) => axios.post( '/banner/bannerList.action', `cityCode=${cityCode}`)

/*攻略列表*/
var guideList = (pageIndex,cityCode,lng,lat) => axios.post( '/scenicspot/guideList.action',  `pageIndex=${pageIndex}&cityCode=${cityCode}&lng=${lng}&lat=${lat}`)

/*攻略详情*/
var scenicDetail = (pageIndex,scenicId) => axios.post( '/scenicspot/scenicDetail.action', `pageIndex=${pageIndex}&scenicId=${scenicId}`)

/*套餐详情说明*/
var packageContent = (packageId) => axios.post( '/scenicspot/packageContent.action', `packageId=${packageId}`)

/*景点信息查看*/
var scenicMsg = (scenicId) => axios.post( '/scenicspot/scenicMsg.action', `scenicId=${scenicId}`)

/*热门搜索*/
var hotWordList = () => axios.post( '/hotword/hotWordList.action')

/*搜索列表*/
var scenicSelect = (pageIndex,scenicName) => axios.post( '/scenicspot/scenicSelect.action', `pageIndex=${pageIndex}&scenicName=${scenicName}`)

/*卡包*/
var cardHold = () => axios.post( '/wallet/cardHold.action',null,{headers:hearder})

/*我的钱包*/
var userWallet = () => axios.post( '/wallet/userWallet.action',null,{headers:hearder})

/*我的门票列表*/
var userTicket = (pageIndex) => axios.post( '/wallet/userTicket.action',`pageIndex=${pageIndex}`,{headers:hearder})

/*门票详情*/
var userTicketDetail = (ticketId) => axios.post( '/wallet/userTicketDetail.action',`ticketId=${ticketId}`,{headers:hearder})

/*活动列表*/
var activityListApp = (pageIndex,cityCode) => axios.post( '/activity/activityListApp.action', `pageIndex=${pageIndex}&cityCode=${cityCode}`)

/*我的余额*/
var userDetail = (pageIndex,logType) => axios.post( '/wallet/userDetail.action',`pageIndex=${pageIndex}&logType=${logType}`,{headers:hearder})

/*余额明细*/
var userBalance = () => axios.post( '/wallet/userBalance.action',null,{headers:hearder})

/*用户中心*/
var userPage = () => axios.post( '/user/userPage.action',null,{headers:hearder})

/*判断登录*/
var getUser = () => axios.post( '/user/getUser.action',null,{headers:hearder})

/*退款*/
var toRefund = () => axios.post( '/pay/toRefund.action',null,{headers:hearder})

/*微信JSsdk*/
var jsApi = (url) => axios.post( '/bikeRent/scanCode.action',`url=${url}`)

export {getPointJson,scenicList,bannerList,guideList,scenicDetail,packageContent,scenicMsg,hotWordList,scenicSelect,cardHold,userWallet,userTicket,userTicketDetail,activityListApp,userDetail,userBalance,userPage,getUser,toRefund,jsApi}
