import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Tag from './Tag'
import './TagList.scss'

export default class TagList extends Component {
  
  static defaultProps = {
    tags: [],
  }

  render() {
    return (
      <View className='c-tagList'>
        { this.props.tags.map((item, index) => (
          <Tag text={item} key={index} type={index + 1} />
        )) }
      </View>
    )
  }
}