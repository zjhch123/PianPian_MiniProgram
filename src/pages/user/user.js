import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { LargeHeader } from '../../components/UserHeader'
import { LightTitle, SubTitle } from '../../components/Title'
import { WorkExp, EduExp } from '../../components/Experience'
import { Card } from '../../components/Card'
import './index.scss'

class User extends Component {

  config = {
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='p-user'>
        <View className='m-header'>
          <LargeHeader headerPath='https://image.hduzplus.xyz/image/1a790d56-b465-464d-9798-dfcbd0fc35a9.png' />
        </View>
        <View className='m-info'>
          <Text className='u-name'>张佳皓</Text>
          <Text className='u-company'>网易杭州科技有限公司</Text>
          <Text className='u-job'>前端开发工程师</Text>
          <Text className='u-desc'>每天叫醒自己的不是闹钟, 而是梦想。</Text>
        </View>
        <View className='m-content'>
          <LightTitle text='工作经历' />
          <View className='m-workExp-list'>
            <WorkExp />
            <WorkExp />
          </View>
          <LightTitle text='教育经历' />
          <View className='m-eduExp-list'>
            <EduExp />
            <EduExp />
          </View>
        </View>
        <View className='m-card'>
          <SubTitle text='展示卡片' />
          <View className='u-card'>
            <Card />
          </View>
        </View>
      </View>
    )
  }
}

export default User