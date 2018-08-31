import Taro, { Component } from '@tarojs/taro'
import { View, Icon } from '@tarojs/components'
import './EduExp.scss'

export default class EduExp extends Component {

  static defaultProps = {
    editable: null,
    onClick: () => {}
  }

  handleClickEdit(e) {
    this.props.onClick(e)
  }

  render() {
    return (
      <View className='c-eduExp'>
        { !!this.props.editable ? <Icon className='u-edit' onClick={this.handleClickEdit.bind(this)} /> : '' }
        <View className='u-school'>
          杭州电子科技大学
        </View>
        <View className='u-content'>
          学士 - 计算机科学与技术
        </View>
        <View className='u-date'>
          2018 年 8 月 - 至今
        </View>
      </View>
    )
  }
}