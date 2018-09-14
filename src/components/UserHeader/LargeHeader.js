import Taro, { Component } from '@tarojs/taro'
import Header from './Header.js'

export default class SmallHeader extends Component {

  static defaultProps = {
    editable: false,
    onClick: () => {}
  }

  handleClick(e) {
    this.props.onClick(e)
  }

  render() {
    const {
      headerPath,
      editable,
    } = this.props

    return (
      <Header editable={editable} onClick={this.handleClick.bind(this)} headerPath={headerPath} width='230' customStyle={{boxShadow: '10rpx 10rpx 40rpx rgba(0,0,0,.3)'}} />
    )
  }
}