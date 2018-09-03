import {
  IS_LOGIN,
  IS_NOT_LOGIN,
  SET_USER_INFO
} from '../constants/user'
import api from '../api'
import utils from '../utils'

export const getMyInfo = () => {
  return async dispatch => {
    const session = await utils.getSession()
    if (session === null) {
      dispatch(isNotLogin())
      return
    }
    try {
      const result = await api.getMyInfo();
      const {
        code,
        content
      } = result.data
      switch (code) {
        case 200:
          dispatch(setUserInfo(content))
          break
        case 401:
          dispatch(isNotLogin())
          break
        default:
          dispatch(isNotLogin())
          break
      }
    } catch (e) {
      dispatch(isNotLogin())
    }
  }
}

export const isLogin = () => {
  return {
    type: IS_LOGIN
  }
}

export const isNotLogin = () => {
  return {
    type: IS_NOT_LOGIN
  }
}

export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    content: userInfo
  }
}
