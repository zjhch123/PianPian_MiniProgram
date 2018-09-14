import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { Title, LightTitle } from '../../components/Title'
import Authorized from '../../components/Authorized'
import { UserCard } from '../../components/Card'
import { getFavorite } from '../../actions/user'

import './index.scss'

@connect((state) => ({
  favorite: state.user.favorite
}), (dispatch) => ({
  launchData(page, empty) {
    dispatch(getFavorite(page, empty))
  }
}))
class Index extends Component {

  static config = {
    enablePullDownRefresh: true,
    onReachBottomDistance: 150
  }

  static defaultProps = {
    isLogin: false
  }
  
  componentDidMount() {
    this.props.launchData(1, true)
  }

  onReachBottom() {
    const favorite = this.props.favorite
    if (favorite.page === favorite.totalPage) { return }
    const nextPage = favorite.page + 1
    this.props.launchData(nextPage, false)
  }

  async onPullDownRefresh() {
    Taro.showLoading({ title: '获取数据', mask: true })
    setTimeout(() => {
      Taro.hideLoading()
      Taro.stopPullDownRefresh()
    }, 100)
    try {
      this.props.launchData(1, true)
    } catch (e) { 
      console.log(e)
    }
  }

  onShareAppMessage() {
    return {
      title: '大家都在用片片, 快来体验一下吧!',
      path: '/pages/index/index',
      imageUrl: require('../../assets/share_big.png')
    }
  }

  render () {
    return (
      <Authorized>
        <View className='p-index g-padding-container'>
          <Title text='收藏' />
          <View className='m-list'>
          {
            this.props.favorite.userList.map((item) => {
              return <UserCard user={item} key={item.userId} />
            })
          }
          {
            this.props.favorite.userList.length === 0 ? 
              <View className='u-noFavorite'><LightTitle text='您还没有收藏任何人' align='center'/></View> :
              ''
          }
          </View>
        </View>
      </Authorized>
    )
  }
}

export default Index
