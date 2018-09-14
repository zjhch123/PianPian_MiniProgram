import Taro from '@tarojs/taro'

const HOST = `https://pianpian.hduzplus.xyz`
const UPLOAD_HOST = `https://pianpian.hduzplus.xyz`

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = dateStr => {
  if (!!dateStr) {
    return dateStr.replace(/\s|月/g, '').replace('年', '-')
  }
  return ''
}

const getSession = async () => {
  let session = null
  try {
    const result = await Taro.getStorage({ key: 'session', })
    session = result.data
  } catch(e) {
  }
  return session
}

const request = async ({url, header = {}, data, method = 'GET'}) => {
  let session = await getSession()
  return Taro.request({
      url: `${HOST}${url}`,
      data: data,
      method: method,
      dataType: 'json',
      header: {
        sessionId: session,
        ...header,
      }
    });
}

const upload = async ({url, header = {}, filePath}) => {
  let session = await getSession()
  return Taro.uploadFile({
          url: `${UPLOAD_HOST}${url}`,
          filePath,
          name: 'file',
          header: {
            sessionId: session,
            ...header,
          },
        })
}

const getDateLimit = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = ('00' + (now.getMonth() + 1)).slice(-2)
  return `${year}-${month}-01`
}

const showError = (msg) => {
  Taro.showToast({
    title: msg,
    icon: 'none',
  })
}

export default {
  HOST,
  formatTime: formatTime,
  request,
  upload,
  getSession,
  formatDate,
  getDateLimit,
  showError
}
