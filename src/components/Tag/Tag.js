import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './Tag.scss'

export default class Tag extends Component {
  
  static defaultProps = {
    text: null,
    type: 1,
  }

  render() {
    const text = this.props.text
    return text !== null ? (
      <View className='c-tag'>
        <Text className={`u-tag f-type${this.props.type}`}>{text}</Text>
      </View>
    ) : ''
  }
}