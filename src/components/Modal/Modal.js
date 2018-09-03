import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Modal.scss'

export default class Modal extends Component {
  
  static defaultProps = {
    visible: false
  }

  render() {
    const {
      visible
    } = this.props
    return (
      <View className={`c-modal ${visible ? 'f-visible' : ''}`}>
        <View className='m-content'>
          { this.props.children }
        </View>
      </View>
    )
  }
}
