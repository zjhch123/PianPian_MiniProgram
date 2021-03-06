import Taro, { Component } from '@tarojs/taro'
import Header from './Header.js'

export default class SmallHeader extends Component {
  render() {
    const headerPath = this.props.headerPath
    return <Header headerPath={headerPath} width='100' />
  }
}