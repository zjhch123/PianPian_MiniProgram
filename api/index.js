const utils = require('../utils/util.js');

module.exports = {
  login(code) {
    return utils.request({
      url: '/api/wechat/login',
      data: {
        code
      }
    })
  },
  getMyInfo() {
    return utils.request({
      url: '/api/user/me',
    })
  },
  editUserBase(data) {
    return utils.request({
      url: '/api/user/me/editBase',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      data: JSON.stringify(data),
    })
  },
  editWorkExp(data) {
    return utils.request({
      url: '/api/user/me/editWorkExp',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      data: JSON.stringify(data),
    })
  },
  deleteWorkExp(id) {
    return utils.request({
      url: '/api/user/me/deleteWorkExp',
      data: { workExpId: id },
    })
  },
  editEduExp(data) {
    return utils.request({
      url: '/api/user/me/editEduExp',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      data: JSON.stringify(data),
    })
  },
  deleteEduExp(id) {
    return utils.request({
      url: '/api/user/me/deleteEduExp',
      data: { eduExpId: id },
    })
  },
  uploadHeader(filePath) {
    return utils.upload({ filePath, url: '/api/user/me/upload?type=header' })
  },
  uploadCard(filePath) {
    return utils.upload({ filePath, url: '/api/user/me/upload?type=card' })
  },
  getRecommend() {
    return utils.request({
      url: '/api/user/getRecommend',
    })
  },
  getUserDetail(id) {
    return utils.request({
      url: '/api/user/getUserDetail',
      data: { id },
    })
  },
  search(condition, page) {
    return utils.request({
      url: '/api/user/search',
      data: {
        q: condition,
        page,
      }
    })
  },
  isFavorite(id) {
    return utils.request({
      url: '/api/user/me/isFavorite',
      data: { id },
    })
  },
  setFavorite(id, type) {
    return utils.request({
      url: '/api/user/me/setFavorite',
      data: { id, type },
    })
  },
  getFavorite(page) {
    return utils.request({
      url: '/api/user/me/getFavorite',
      data: {
        page,
      }
    })
  }
}