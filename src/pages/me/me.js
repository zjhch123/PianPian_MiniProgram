import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { LargeHeader } from '../../components/UserHeader'
import UserInfo from '../../components/UserInfo'
import { LightTitle, SubTitle } from '../../components/Title'
import { WorkExp, EduExp } from '../../components/Experience'
import { Card } from '../../components/Card'
import './index.scss'

class Me extends Component {

  config = {
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClickHeader(e) {
    console.log(e)
  }

  handleEditWorkExp(e) {
    console.log(e)
  }

  handleEditEduExp(e) {
    console.log(e)
  }

  handleCardEdit(e) {
    console.log(e)
  }

  render () {
    return (
      <View className='p-me'>
        <View className='m-header'>
          <LargeHeader
            onClick={this.handleClickHeader.bind()}
            editable='true'
            headerPath='https://image.hduzplus.xyz/image/1a790d56-b465-464d-9798-dfcbd0fc35a9.png' 
          />
        </View>
        <View className='m-info'>
          <UserInfo />
        </View>
        <View className='m-content'>
          <LightTitle text='工作经历' />
          <View className='m-workExp-list'>
            <WorkExp 
              editable='true'
              onClick={this.handleEditWorkExp.bind(this)}
            />
          </View>
          <LightTitle text='教育经历' />
          <View className='m-eduExp-list'>
            <EduExp 
              editable='true'
              onClick={this.handleEditEduExp.bind(this)}
            />
          </View>
        </View>
        <View className='m-card'>
          <SubTitle text='展示卡片' />
          <View className='u-card'>
            <Card 
              editable='true'
              onClick={this.handleCardEdit.bind(this)}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Me
