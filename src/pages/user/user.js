import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image, Button } from '@tarojs/components'
import { LargeHeader } from '../../components/UserHeader'
import UserInfo from '../../components/UserInfo'
import { LightTitle, SubTitle, NoExpTitle } from '../../components/Title'
import { WorkExp, EduExp } from '../../components/Experience'
import { Card } from '../../components/Card'
import TabNav from '../../components/TabNav'
import api from '../../api'
import { setFavorite, setUnFavorite } from '../../actions/user'
import './index.scss'

@connect(({ user }) => ({
  isLogin: user.isLogin
}), (dispatch) => ({
  setFavorite(userBase) {
    dispatch(setFavorite(userBase))
  },
  setUnFavorite(id) {
    dispatch(setUnFavorite(id))
  }
}))
class User extends Component {

  static config = {
    enablePullDownRefresh: true,
  }

  static defaultProps = {
    isLogin: true,
  }

  constructor() {
    this.state = {
      fromShare: false,
      user: {
        id: 0,
        userType: 0,
        UserBase: {},
        WorkExps: [],
        EduExps: [],
        isFavorite: 0,
      }
    }
  }

  componentDidMount() {
    const id = this.$router.params.id
    this.id = id
    this.getUserInfo()
    if (Taro.getCurrentPages().length === 1) {
      this.setState({
        fromShare: true
      })
    }
  }

  async getUserInfo() {
    this.isFavorite()
    const result = await api.getUserDetail(this.id)
    const data = result.data
    if (data.code !== 200) {
      return
    }
    this.setState({
      user: data.content
    })
  }

  onShareAppMessage() {
    return {
      title: `这是 ${this.state.user.UserBase.username} 的名片`
    }
  }

  async isFavorite() {
    const userId = this.id
    const result = await api.isFavorite(userId)
    const data = result.data
    if (data.code !== 200) {
      this.setState({
        isFavorite: 0
      })
    } else {
      this.setState({
        isFavorite: data.content ? 1 : 0
      })
    }
  }

  async onPullDownRefresh() {
    Taro.showLoading({ title: '获取数据', mask: true })
    try {
      await this.getUserInfo()
    } catch(e) {}
    Taro.hideLoading()
    Taro.stopPullDownRefresh()
  }

  async favorite(type) {
    const userId = this.id
    const result = await api.setFavorite(userId, type)
    const data = result.data
    if (data.code === 200) {
      this.setState({
        isFavorite: type
      })
      if (type === 1) {
        this.props.setFavorite({
          userId: this.id,
          ...this.state.user.UserBase,
        })
      } else {
        this.props.setUnFavorite(this.id)
      }
    }
  }

  setUnFavorite() {
    this.favorite(0)  
  }

  setFavorite() {
    this.favorite(1)  
  }

  render () {
    const {
      UserBase,
      WorkExps,
      EduExps,
    } = this.state.user
    return (
      <View className='p-user'>
      { this.props.isLogin && (this.state.isFavorite ?
        <View className='u-favorite' onClick={this.setUnFavorite.bind(this)}><Image src={require('../../assets/favorited.png')} className='u-img' /></View> :
        <View className='u-favorite' onClick={this.setFavorite.bind(this)}><Image src={require('../../assets/not_favorite.png')} className='u-img' /></View>)
      }
        <Button 
          className='u-share'
          hoverClass='u-share-hover'
          hoverStartTime='0'
          hoverStayTime='0'
          openType='share'
        >
          <Image src={require('../../assets/share.png')} className='share' />
        </Button>
        <View className='m-header'>
          <LargeHeader headerPath={UserBase.header}  />
        </View>
        <View className='m-info'>
          <UserInfo info={UserBase} />
        </View>
        <View className='m-content'>
          <LightTitle text='工作经历' />
          <View className='m-workExp-list'>
          {
            WorkExps.map(workExp => (
              <WorkExp info={workExp} key={workExp.id} />
            ))
          }
          { WorkExps.length === 0 && <NoExpTitle text='暂未填写工作经历' />}
          </View>
          <LightTitle text='教育经历' />
          <View className='m-eduExp-list'>
          {
            EduExps.map(eduExp => (
              <EduExp info={eduExp} key={eduExp.id} />
            ))
          }
          { EduExps.length === 0 && <NoExpTitle text='暂未填写教育经历' />}
          </View>
        </View>
        <View className='m-card'>
          <SubTitle text='展示卡片' />
          <View className='u-card'>
            <Card imagePath={UserBase.card} />
          </View>
        </View>
        {
          this.state.fromShare && <TabNav />
        }
      </View>
    )
  }
}

export default User
