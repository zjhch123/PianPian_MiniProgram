const HOST = `http://f0d3e41a.ngrok.io/`

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
    });
  });
}

module.exports = {
  formatTime: formatTime,
  request,
}
