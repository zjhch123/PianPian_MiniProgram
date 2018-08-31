import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './Header.scss'

export default class Header extends Component {

  static defaultProps = {
    headerPath: require('../../assets/default_header.png')
  }

  render() {
    const {
      width,
      className = '',
      customStyle,
      headerPath,
    } = this.props

    const style = {
      width: `${width}rpx`,
      height: `${width}rpx`,
      ...customStyle
    }

    return (
      <View className={`c-header ${className}`}>
        <Image className='u-img' src={headerPath} style={{...style}} />
      </View>
    )
  }
}