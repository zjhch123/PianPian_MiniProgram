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

const request = ({url, header = {}, data, method = 'GET'}) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'session',
      success: (data) => resolve(data),
      fail: () => resolve(''),
    })
  }).then(sessionId => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${HOST}${url}`,
        data: data,
        method: method,
        dataType: 'json',
        header: {
          sessionId: sessionId.data,
          ...header,
        },
        success: (data) => resolve(data),
        fail: (e) => reject(e),
      });
    })
  });
}

const upload = ({url, header = {}, filePath}) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'session',
      success: (data) => resolve(data),
      fail: () => resolve(''),
    })
  }).then(sessionId => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${UPLOAD_HOST}${url}`,
        filePath,
        name: 'file',
        header: {
          sessionId: sessionId.data,
          ...header,
        },
        success: res => resolve(res),
        fail: e => reject(e)
      })
    })
  })
}

module.exports = {
  HOST,
  formatTime: formatTime,
  request,
  upload,
}
