const Base64 = require('js-base64').Base64
export function formatDateTime (date) {
  let dd
  if (!date) return
  if (date !== 'object') {
  dd = new Date(parseFloat(date*1000))
  }
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = dd.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = dd.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = dd.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute
}
export function formatYear(date) {
  let dd
  if (!date) return
  if (date !== 'object') {
    dd = new Date(parseFloat(date*1000))
  }
  var y = dd.getFullYear()
  return y
}

export function formatMonthAndDay(date) {
  let dd
  if (!date) return
  if (date !== 'object') {
    dd = new Date(parseFloat(date*1000))
  }
  var m = dd.getMonth()
  var d = dd.getDate()
  d = d < 10 ? ('0' + d) : d
  return m + '/' + d
}

export function formatTime(date) {
  let dd
  if (!date) return
  if (date !== 'object') {
    dd = new Date(parseFloat(date*1000))
  }
  var h = dd.getHours()
  var minute = dd.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  return h + ':' + minute
}
export function formatLocation (location = '') {
  return location.replace('常居:', '')
}
export function doubleBase64 (str = '') {
  return Base64.encode(Base64.encode(str))
}
export function http2https (url) {
  return url.replace('http://', 'https://')
}
export function precent (val,sum) {
  if(sum == 0) return "50%"
  return Math.round((val/sum) * 100) + "%";
}
export function timeZhChat (stamp) {
    console.log(stamp)
    return 12
}

// export function _isMobile (){
//   let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
//   return flag;
// }
