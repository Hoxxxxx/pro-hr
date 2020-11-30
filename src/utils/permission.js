/**
 * @param {String} btnName
 * @returns {Boolean} 
 */

export function testBtnAuth(btnName) {
  var btnAuth = Boolean
  var permissionList = JSON.parse( sessionStorage.getItem('permissionList') )
  var btnList = []

  permissionList.forEach ( item => {
    btnList.push( item.name )
  })

  if ( btnList.includes('api.v2.check.' + btnName) ) {
    btnAuth = true
  } else {
    btnAuth = false
  }
  // console.log('permissionList: ',permissionList)
  // console.log('btnList: ',btnList)
  // console.log('btnAuth: ',btnAuth)
  return btnAuth
}