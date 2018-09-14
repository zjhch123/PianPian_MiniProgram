import {
  IS_LOGIN,
  IS_NOT_LOGIN,
  SET_USER_INFO,
  APPEND_FAVORITE,
  RESET_FAVORITE,
  SET_FAVORITE,
  SET_UNFAVORITE
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

export const getFavorite = (page, empty = false) => {
  return async dispatch => {
    const session = await utils.getSession()
    if (session === null) {
      dispatch(isNotLogin())
      return
    }
    try {
      const result = await api.getFavorite(page)
      const data = result.data
      if (data.code !== 200) {
        dispatch(isNotLogin())
        return
      }
      dispatch({
        type: empty ? RESET_FAVORITE : APPEND_FAVORITE,
        content: {
          userList: data.content.list,
          page,
          totalPage: data.content.totalPage
        }
      })
    } catch (e) {
      dispatch(isNotLogin())
    }
  }
}

export const setFavorite = (userBase) => {
  return {
    type: SET_FAVORITE,
    content: userBase
  }
}

export const setUnFavorite = (id) => {
  return {
    type: SET_UNFAVORITE,
    content: id
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
