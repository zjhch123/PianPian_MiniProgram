import Taro, { Component } from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import './index.scss'

export default class UserInfo extends Component {
  
  static defaultProps = {
    editable: false,
    info: {},
    onClick: () => {}
  }

  handleClickEdit() {
    this.props.onClick()
  }

  render() {
    const {
      editable,
      info
    } = this.props
    return (
      <View className='c-userInfo'>
        { !!editable ? <Icon className='u-edit' onClick={this.handleClickEdit.bind(this)} /> : ''}
        <Text className='u-name'>{info.username || '新用户'}</Text>
        { info.company && <Text className='u-company'>{info.company}</Text> }
        { info.job && <Text className='u-job'>{info.job}</Text> }
        { info.desc && <Text className='u-desc'>{info.desc}</Text> }
      </View>
    )
  }
}