import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button, Form } from '@tarojs/components'
import Modal from './Modal'
import utils from '../../utils'
import './EditModal.scss'

export default class EditInfo extends Component {
  
  static defaultProps = {
    info: {},
    onCancel: () => {},
    onSubmit: () => {},
  }

  clickCancel(e) {
    this.props.onCancel(e)
  }

  clickSubmit(e) {
    const submit = e.detail.value
    if (this.validate(submit)) {
      this.props.onSubmit(submit)
    }
  }

  validate(data) {
    if (data.username.trim() === '') {
      utils.showError('请输入姓名。')
      return false
    }
    return true
  }

  render() {
    const {
      visible,
      info
    } = this.props
    return (
      <Modal visible={visible}>
        <Text className='u-title'>编辑基本信息</Text>
        <Form onSubmit={this.clickSubmit.bind(this)}>
          <View className='m-input-group'>
            <Text className='u-label'>姓名</Text>
            <Input 
              type='text' 
              className='u-input'
              value={info.username}
              name='username'
              placeholder='请输入姓名, 如：张三'
            />
          </View>
          <View className='m-input-group'>
            <Text className='u-label'>公司</Text>
            <Input 
              type='text' 
              className='u-input' 
              value={info.company}
              name='company'
              placeholder='请输入公司, 如：阿里巴巴'
            />
          </View>
          <View className='m-input-group'>
            <Text className='u-label'>职位</Text>
            <Input 
              type='text' 
              className='u-input' 
              value={info.job}
              name='job'
              placeholder='请输入职位, 如：前端开发' 
            />
          </View>
          <View className='m-input-group'>
            <Text className='u-label'>一句话介绍</Text>
            <Input 
              type='text' 
              value={info.desc}
              name='desc'
              className='u-input'
            />
          </View>
          <View className='u-footer'>
          <Button 
            className='u-btn' 
            plain='1' 
            hoverClass='u-btn-hover' 
            hoverStartTime='0' 
            hoverStayTime='0'
            onClick={this.clickCancel.bind(this)}
          >取消</Button>
          <Button 
            className='u-btn u-success' 
            plain
            formType='submit'
          >提交</Button>
        </View>
        </Form>
      </Modal>
    )
  }
}