import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button, CheckboxGroup, Checkbox, Picker, Form } from '@tarojs/components'
import Modal from './Modal'
import utils from '../../utils'
import './EditModal.scss'

export default class EditEdu extends Component {
  
  static defaultProps = {
    onCancel: () => {},
    onSubmit: () => {},
    onDelete: () => {}
  }

  constructor() {
    this.state = {
      degrees: [ '学士', '硕士', '博士' ],
      dateLimit: utils.getDateLimit(),
      checkbox: false,
      info: {
        id: -1,
        school: '',
        degree: '',
        major: '',
        startTime: '',
        endTime: '',
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const info = nextProps.info
    this.setState({
      info: {
        id: info.id || -1,
        school: info.school || '',
        degree: info.degree || '',
        major: info.major || '',
        startTime: utils.formatDate(info.startTime),
        endTime: utils.formatDate(info.endTime),
      },
      checkbox: info.endTime === '至今'
    })
  }

  handleClickNow(e) {
    this.setState({
      checkbox: e.detail.value.length === 1
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

  selectDegree(e) {
    const index = Number(e.detail.value)
    this.setState({
      info: {
        ...this.state.info,
        degree: this.state.degrees[index]
      }
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

  clickCancel(e) {
    this.props.onCancel(e)
  }

  clickSubmit(e) {
    const submit = {
      id: this.state.info.id,
      ...e.detail.value,
      degree: this.state.info.degree,
      startTime: this.state.info.startTime,
      endTime: this.state.info.endTime,
      checkbox: this.state.checkbox
    }
    if (this.validate(submit)) {
      this.props.onSubmit(submit)
    }
  }

  validate(data) {
    if (data.school.trim() === '') {
      utils.showError('请输入学校。')
      return false
    }
    if (data.startTime.trim() === '' || (!data.checkbox && data.endTime.trim() === '')) {
      utils.showError('请输入开始/结束时间。')
      return false
    }
    if (!data.checkbox && new Date(data.startTime).getTime() > new Date(data.endTime).getTime()) {
      utils.showError('请检查开始/结束时间。')
      return false
    }
    return true
  }

  clickDelete() {
    this.props.onDelete(this.state.info.id)
  }

  render() {

    const {
      visible
    } = this.props

    const info = this.state.info

    return (
      <Modal visible={visible}>
        <Text className='u-title'>编辑教育经历</Text>
        <Form onSubmit={this.clickSubmit.bind(this)}>
          <View className='m-input-group'>
            <Text className='u-label'>学校</Text>
            <Input 
              type='text' 
              className='u-input'
              value={info.school}
              name='school'
              placeholder='请输入学校, 如：浙江大学'
            />
          </View>
          <View class='m-input-group'>
            <Text class='u-label'>学位</Text>
            <Picker 
              mode='selector' 
              range={this.state.degrees}
              onChange={this.selectDegree.bind(this)}
            >
              <Text class='u-input'>{info.degree}</Text>
            </Picker>
          </View>
          <View className='m-input-group'>
            <Text className='u-label'>专业</Text>
            <Input 
              type='text' 
              className='u-input' 
              value={info.major}
              name='major'
              placeholder='请输入专业, 如：计算机科学与技术' 
            />
          </View>
          <View class='m-input-group'>
            <Text class='u-label'>开始时间</Text>
            <Picker 
              mode='date'
              end={this.state.dateLimit}
              onChange={this.selectStartTime.bind(this)}
              fields='month'
            >
              <Text class='u-input'>{info.startTime}</Text>
            </Picker>
          </View>
          <View class='m-input-group'>
            <Text class='u-label'>结束时间</Text>
            <View class='u-checkbox'>
            <CheckboxGroup onChange={this.handleClickNow.bind(this)}>
              <Checkbox 
                class='u-check' 
                checked={this.state.checkbox}
                value='至今' 
              />至今
            </CheckboxGroup>
            </View>
            <Picker 
              mode='date' 
              end={this.state.dateLimit}
              disabled={this.state.checkbox}
              onChange={this.selectEndTime.bind(this)}
              fields='month'
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