import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { Title, SubTitle } from '../../components/Title'
import { UserCard } from '../../components/Card'
import './index.scss'

class Search extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='p-search g-padding-container'>
        <Title text='搜索' />
        <View className='m-input'>
          <Input 
            confirm-type='search'
            class='u-input'
            type='text'
            placeholder='输入姓名、公司、职业等进行搜索'
          />
        </View>
        <View>
          <SubTitle text='推荐用户' />
          <View className='m-list'>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </View>
        </View>
        {/* <View className='m-list'>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </View> */}
      </View>
    )
  }
}

export default Search
