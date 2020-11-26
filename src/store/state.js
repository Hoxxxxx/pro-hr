let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
const state = {
  userInfo: userInfo,
  upload_url: 'http://test-erp.hualumedia.com/api/v2/hr/files/upload'
}
export default state