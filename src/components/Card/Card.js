import Taro, { Component } from '@tarojs/taro'
import { View, Image, Icon } from '@tarojs/components'
import utils from '../../utils'
import './Card.scss'

export default class Card extends Component {

  static defaultProps = {
    editable: false,
    imagePath: '/upload/demo_person1.png',
    onClick: () => {}
  }

  handleClickCard(e) {
    this.props.onClick(e)
  }

  render() {
    const {
      imagePath,
      editable
    } = this.props

    const path = utils.HOST + imagePath

    return (
      <View className='c-card' onClick={this.handleClickCard.bind(this)}>
        <Image src={path} className='u-bg' />
        { this.props.children }
        { !!editable ? <View className='u-edit'><Icon className='u-photo'></Icon></View> : ''}
      </View>
    )
  }
}