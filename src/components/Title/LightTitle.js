import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './LightTitle.scss'

export default class LightTitle extends Component {
  
  static defaultProps = {
    text: '',
    align: 'left'
  }

  render() {
    const text = this.props.text
    return (
      <View className='c-lightTlt' style={{textAlign: this.props.align}}>
        <Text className='u-tlt'>{text}</Text>
      </View>
    )
  }
}