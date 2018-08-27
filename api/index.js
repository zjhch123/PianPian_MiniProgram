const utils = require('../utils/util.js');

module.exports = {
  login(code) {
    return utils.request({
      url: 'api/wechat/login',
      data: {
        code
      }
    })
  },
  getMyInfo() {
    return utils.request({
      url: 'api/user/me',
    })
  },
  editUserBase(data) {
    return utils.request({
      url: 'api/user/me/editBase',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      data: JSON.stringify(data),
    })
  },
  editJob(data) {
    return utils.request({
      url: 'api/user/me/editJob',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      data: JSON.stringify(data),
    })
  }
}