let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
const state = {
  userInfo: userInfo,
  permissionList: [],
  // 上传地址
  upload_url: 'http://test-erp.hualumedia.com/api/v2/hr/files/upload', // 卢星宇：仅文件上传——应收账款上传
  upload_pic_url: 'http://test-erp.hualumedia.com/api/v2/files/upload',// 张继东：允许多类型上传
  upload_scan: 'http://test-erp.hualumedia.com/api/v2/finance/bank-slips/upload',// 陈仁政：扫描件上传（可返回扫描结果）
}
export default state