import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './Header.scss'

export default class Header extends Component {

  render() {
    const headerPath = this.props.headerPath || require('../../assets/default_header.png')
    const {
      width,
      className = '',
    } = this.props
    return (
      <View className={`c-header ${className}`}>
        <Image className='u-img' src={headerPath} style={{width: `${width}rpx`, height: `${width}rpx`}} />
      </View>
    )
  }
}