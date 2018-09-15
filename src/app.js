import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider, connect } from '@tarojs/redux'
import { getMyInfo } from './actions/user'

import Index from './pages/index'
import configStore from './store'
import './app.scss'


const store = configStore()

@connect(({}) => ({}), (dispatch) => ({
  getMyInfo() {
    dispatch(getMyInfo())
  }
}))
class App extends Component {

  config = {
    pages: [
      'pages/me/me',
      'pages/index/index',
      "pages/search/search",
      "pages/user/user",
      "pages/uploadCard/uploadCard"
    ],
    tabBar: {
      selectedColor: "#007cb1",
      color: "#bfbfbf",
      backgroundColor: "#f5f5f5",
      list: [
        {
          iconPath: './assets/favorite.png',
          selectedIconPath: './assets/s_favorite.png',
          pagePath: "pages/index/index",
          text: "收藏"
        },
        {
          iconPath: './assets/search.png',
          selectedIconPath: './assets/s_search.png',
          pagePath: "pages/search/search",
          text: "搜索"
        },
        {
          iconPath: './assets/me.png',
          selectedIconPath: './assets/s_me.png',
          pagePath: "pages/me/me",
          text: "我的"
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '片片plus',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    this.props.getMyInfo()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
