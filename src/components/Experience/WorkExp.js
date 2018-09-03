import Taro, { Component } from '@tarojs/taro'
import { View, Icon } from '@tarojs/components'
import './WorkExp.scss'

export default class WorkExp extends Component {

  static defaultProps = {
    editable: null,
    info: {},
    onClick: () => {}
  }

  handleClickEdit() {
    this.props.onClick(this.props.info)
  }

  render() {
    const {
      info
    } = this.props
    return (
      <View className='c-workExp'>
        { !!this.props.editable ? <Icon className='u-edit' onClick={this.handleClickEdit.bind(this)} /> : '' }
        <View className='u-company'>{info.company}</View>
        <View className='u-job'>{info.job}</View>
        <View className='u-date'>{info.startTime} - {info.endTime}</View>
      </View>
    )
  }
}