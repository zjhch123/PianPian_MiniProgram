import Taro, { Component } from '@tarojs/taro'
import Header from './Header.js'

export default class SmallHeader extends Component {
  render() {
    return <Header width='100' />
  }
}