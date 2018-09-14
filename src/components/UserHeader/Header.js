import Taro, { Component } from '@tarojs/taro'
import { View, Image, Icon } from '@tarojs/components'
import utils from '../../utils'
import './Header.scss'

export default class Header extends Component {

  static defaultProps = {
    editable: false,
    headerPath: '/upload/default_header.png',
    onClick: () => {}
  }

  handleClick(e) {
    this.props.onClick(e)
  }

  render() {
    const {
      width,
      className = '',
      customStyle,
      headerPath,
      editable
    } = this.props

    const style = {
      width: `${width}rpx`,
      height: `${width}rpx`,
      ...customStyle
    }

    const imagePath = utils.HOST + headerPath

    return (
      <View className={`c-header ${className}`} onClick={this.handleClick.bind(this)}>
        <Image className='u-img' src={imagePath} style={{...style}} />
        { !!editable ? <Icon className='u-photo'></Icon> : ''}
      </View>
    )
  }
}