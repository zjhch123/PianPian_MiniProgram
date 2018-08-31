import Taro, { Component } from '@tarojs/taro'
import Header from './Header.js'
import './LargeHeader.scss'

export default class SmallHeader extends Component {

  static defaultProps = {
    editable: null,
    editable: false,
    onClick: () => {}
  }

  render() {
    const {
      headerPath,
      editable,
      onClick
    } = this.props
    return (
      <Header editable={editable} onClick={onClick} headerPath={headerPath} width='230' customStyle={{boxShadow: '10rpx 10rpx 40rpx rgba(0,0,0,.3)'}} />
    )
  }
}