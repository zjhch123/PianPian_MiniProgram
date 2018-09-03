import Taro from '@tarojs/taro'

const HOST = `http://test.hduzplus.xyz`
const UPLOAD_HOST = `http://test.hduzplus.xyz`

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

export default {
  HOST,
  formatTime: formatTime,
  request,
  upload,
  getSession,
}
