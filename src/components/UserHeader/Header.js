import Taro, { Component } from '@tarojs/taro'
import { View, Image, Icon } from '@tarojs/components'
import './Header.scss'

export default class Header extends Component {

  static defaultProps = {
    headerPath: require('../../assets/default_header.png'),
    editable: false,
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

    return (
      <View className={`c-header ${className}`} onClick={this.handleClick.bind(this)}>
        <Image className='u-img' src={headerPath} style={{...style}} />
        { !!editable ? <Icon className='u-photo'></Icon> : ''}
      </View>
    )
  }
}