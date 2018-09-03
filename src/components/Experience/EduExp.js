import Taro, { Component } from '@tarojs/taro'
import { View, Icon } from '@tarojs/components'
import './EduExp.scss'

export default class EduExp extends Component {

  static defaultProps = {
    editable: null,
    info: {},
    onClick: () => {}
  }

  handleClickEdit() {
    this.props.onClick(this.props.info)
  }

  render() {
    const info = this.props.info
    return (
      <View className='c-eduExp'>
        { !!this.props.editable ? <Icon className='u-edit' onClick={this.handleClickEdit.bind(this)} /> : '' }
        <View className='u-school'>
          {info.school}
        </View>
        <View className='u-content'>
          {info.degree} - {info.major}
        </View>
        <View className='u-date'>
          {info.startTime} - {info.endTime}
        </View>
      </View>
    )
  }
}