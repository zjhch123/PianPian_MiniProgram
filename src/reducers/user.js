import { IS_LOGIN, IS_NOT_LOGIN, SET_USER_INFO, APPEND_FAVORITE, RESET_FAVORITE, SET_FAVORITE, SET_UNFAVORITE } from '../constants/user'

const INITIAL_STATE = {
  isLogin: true,
  userInfo: {
    id: 0,
    userType: 0,
    UserBase: {
      
    },
    WorkExps: [],
    EduExps: [],
  },
  favorite: {
    userList: [],
    page: 1,
    totalPage: 1
  },
}

export default function counter (state = INITIAL_STATE, action) {
  let newList = null
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin: true
      }
    case IS_NOT_LOGIN:
      return {
         ...state,
         isLogin: false
      }
    case SET_USER_INFO:
      return {
        ...state,
        isLogin: true,
        userInfo: action.content
      }
    case APPEND_FAVORITE:
      return {
        ...state,
        favorite: {
          userList: state.favorite.userList.concat(action.content.userList),
          page: action.content.page,
          totalPage: action.content.totalPage
        }
      }
    case RESET_FAVORITE:
      return {
        ...state,
        favorite: {
          userList: action.content.userList,
          page: 1,
          totalPage: action.content.totalPage
        }
      }
    case SET_FAVORITE:
      newList = [ action.content, ...state.favorite.userList ]
      return {
        ...state,
        favorite: {
          ...state.favorite,
          userList: newList,
        }
      }
    case SET_UNFAVORITE:
      newList = state.favorite.userList.filter(item => {
        return item.userId != action.content
      })
      return {
        ...state,
        favorite: {
          ...state.favorite,
          userList: newList
        }
      }
    default:
      return state
  }
}
