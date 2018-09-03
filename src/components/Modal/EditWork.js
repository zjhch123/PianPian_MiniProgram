import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button, CheckboxGroup, Checkbox, Picker, Form } from '@tarojs/components'
import Modal from './Modal'
import './EditModal.scss'

export default class EditWork extends Component {
  
  static defaultProps = {
    info: {},
    visible: false,
    onCancel: () => {},
    onSubmit: () => {},
    onDelete: () => {},
  }

  constructor() {
    const now = new Date()
    const year = now.getFullYear()
    const month = ('00' + (now.getMonth() + 1)).slice(-2)
    this.state = {
      dateLimit: `${year}-${month}-01`,
      checkbox: false,
      info: {
        id: -1,
        company: '',
        job: '',
        startTime: '',
        endTime: '',
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const info = nextProps.info || {}
    this.setState({
      info: {
        id: info.id || -1,
        company: info.company || '',
        job: info.job || '',
        startTime: (info.startTime || '').replace(/\s|月/g, '').replace('年', '-'),
        endTime: (info.endTime || '').replace(/\s|月/g, '').replace('年', '-')
      },
      checkbox: info.endTime === '至今'
    })
  }

  handleClickNow(e) {
    this.setState({
      checkbox: e.detail.value.length === 1
    })
  }

  selectEndTime(e) {
    this.setState({
      info: {
        ...this.state.info,
        endTime: e.detail.value
      }
    })
  }

  selectStartTime(e) {
    this.setState({
      info: {
        ...this.state.info,
        startTime: e.detail.value
      }
    })
  }

  clickCancel(e) {
    this.props.onCancel(e)
  }

  clickSubmit(e) {
    const submit = {
      id: this.state.info.id || -1,
      ...e.target.value,
      startTime: this.state.info.startTime,
      endTime: this.state.info.endTime,
      checkbox: this.state.checkbox
    }
    this.props.onSubmit(submit)
  }

  clickDelete() {
    this.props.onDelete(this.state.info.id)
  }

  render() {
    const info = this.state.info
    return (
      <Modal visible={this.props.visible}>
        <Text className='u-title'>编辑工作经历</Text>
        <Form onSubmit={this.clickSubmit.bind(this)}>
          <View className='m-input-group'>
            <Text className='u-label'>公司</Text>
            <Input 
              type='text' 
              className='u-input'
              name='company'
              value={info.company}
              placeholder='请输入公司, 如：阿里巴巴'
            />
          </View>
          <View className='m-input-group'>
            <Text className='u-label'>职位</Text>
            <Input 
              type='text' 
              className='u-input' 
              name='job'
              value={info.job}
              placeholder='请输入职位, 如：前端开发' 
            />
          </View>
          <View class='m-input-group'>
            <Text class='u-label'>开始时间</Text>
            <Picker 
              mode='date' 
              fields='month'
              onChange={this.selectStartTime.bind(this)}
              end={this.state.dateLimit}
            >
              <Text class='u-input'>{info.startTime}</Text>
            </Picker>
          </View>
          <View class='m-input-group'>
            <Text class='u-label'>结束时间</Text>
            <View class='u-checkbox'>
            <CheckboxGroup onChange={this.handleClickNow.bind(this)}>
              <Checkbox 
                checked={this.state.checkbox}
                class='u-check' 
                value='至今'
              />至今
            </CheckboxGroup>
            </View>
            <Picker 
              mode='date' 
              fields='month'
              onChange={this.selectEndTime.bind(this)}
              end={this.state.dateLimit}
              disabled={this.state.checkbox}
            >
              <Text class='u-input' style={{color: this.state.checkbox ? 'gray' : 'black'}}>{info.endTime}</Text>
            </Picker>
          </View>
          {
            info.id !== -1 && <View className='u-delete-btn' onClick={this.clickDelete.bind(this)}>删除</View>
          }
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