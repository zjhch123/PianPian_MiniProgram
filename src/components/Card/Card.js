import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './Card.scss'

export default class Card extends Component {

  render() {
    const imagePath = this.props.imagePath || require('../../assets/demo_person1.png')
    return (
      <View className='c-card'>
        <Image src={imagePath} className='u-bg' />
      </View>
    )
  }
}