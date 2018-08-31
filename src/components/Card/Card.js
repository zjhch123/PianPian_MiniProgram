import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './Card.scss'

export default class Card extends Component {

  static defaultProps = {
    imagePath: require('../../assets/demo_person1.png')
  }

  render() {
    const imagePath = this.props.imagePath
    return (
      <View className='c-card'>
        <Image src={imagePath} className='u-bg' />
      </View>
    )
  }
}