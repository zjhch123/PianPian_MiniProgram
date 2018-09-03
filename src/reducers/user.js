import { IS_LOGIN, IS_NOT_LOGIN, SET_USER_INFO } from '../constants/user'

const INITIAL_STATE = {
  isLogin: true,
  userInfo: {
    id: 0,
    userType: 0,
    UserBase: {
      
    },
    WorkExps: [],
    EduExps: [],
  }
}

export default function counter (state = INITIAL_STATE, action) {
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
    default:
      return state
  }
}
