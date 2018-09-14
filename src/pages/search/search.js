import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { Title, SubTitle } from '../../components/Title'
import { UserCard } from '../../components/Card'
import api from '../../api'
import './index.scss'

class Search extends Component {

  static config = {
    enablePullDownRefresh: true,
    onReachBottomDistance: 150
  }

  constructor(props) {
    super(props)
    this.state = {
      q: '',
      userList: [],
      page: 1,
      totalPage: 1,
    }
  }

  componentDidMount() {
    this.launchDefaultData()  
  }

  async launchDefaultData() {
    const result = await api.getRecommend()
    const data = result.data
    if (data.code !== 200) {
      return ''
    }
    this.setState({
      userList: data.content.list
    })
  }

  async launchSearchData(q, page) {
    const result = await api.search(q, page)
    const data = result.data
    if (data.code !== 200) {
      return 
    }
    this.setState({
      userList: data.content.list,
      page,
      totalPage: data.content.totalPage
    })
  }

  search(e) {
    const q = e.detail.value.trim()
    this.setState({ q })
    if (q === '') { 
      this.launchDefaultData()
      return 
    }
    this.launchSearchData(q, 1)
  }

  async onPullDownRefresh() {
    Taro.showLoading({ title: '获取数据', mask: true })
    try {
      if (this.state.q === '') {
        await this.launchDefaultData()
      } else {
        await this.launchSearchData(this.state.q, 1)
      }
    } catch (e) {}
    Taro.stopPullDownRefresh()
    Taro.hideLoading()
  }

  onReachBottom() {
    if (this.state.q === '') { return }
    if (this.state.page === this.state.totalPage) { return }
    const q = this.state.q
    const nextPage = this.state.page + 1
    this.launchSearchData(q, nextPage)
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
      <View className='p-search g-padding-container'>
        <Title text='搜索' />
        <View className='m-input'>
          <Input 
            onConfirm={this.search.bind(this)}
            confirm-type='search'
            class='u-input'
            type='text'
            placeholder='输入姓名、公司、职业等进行搜索'
          />
        </View>
        <View>
          { this.state.q == '' ? <SubTitle text='推荐用户' /> : <SubTitle text='搜索结果' /> }
          <View className='m-list'>
          {
            this.state.userList.map(item => (
              <UserCard user={item} key={item.userId} />
            ))
          }
          </View>
        </View>
      </View>
    )
  }
}

export default Search
