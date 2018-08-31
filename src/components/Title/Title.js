import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './Title.scss'

export default class Title extends Component {
  
  static defaultProps = {
    text: ''
  }

  render() {
    const text = this.props.text
    return (
      <View className='c-tlt'>
        <Text className='u-tlt'>{text}</Text>
      </View>
    )
  }
}