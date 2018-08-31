import Taro, { Component } from '@tarojs/taro'
import { View, Image, Icon } from '@tarojs/components'
import './Card.scss'

export default class Card extends Component {

  static defaultProps = {
    imagePath: require('../../assets/demo_person1.png'),
    editable: false,
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
    return (
      <View className='c-card' onClick={this.handleClickCard.bind(this)}>
        <Image src={imagePath} className='u-bg' />
        { !!editable ? <View className='u-edit'><Icon className='u-photo'></Icon></View> : ''}
      </View>
    )
  }
}