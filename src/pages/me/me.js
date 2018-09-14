import Taro, { Component } from '@tarojs/taro'
import { View, Icon } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { LargeHeader } from '../../components/UserHeader'
import Authorized from '../../components/Authorized'
import UserInfo from '../../components/UserInfo'
import { LightTitle, SubTitle, NoExpTitle } from '../../components/Title'
import { WorkExp, EduExp } from '../../components/Experience'
import { Card } from '../../components/Card'
import { EditInfo, EditWork, EditEdu } from '../../components/Modal'
import api from '../../api'

import { getMyInfo } from '../../actions/user'

import './index.scss'


@connect(({ user }) => ({
  userInfo: user.userInfo
}), (dispatch) => ({
  getMyInfo() {
    dispatch(getMyInfo())
  }
}))
class Me extends Component {

  static config = {
    enablePullDownRefresh: true,
  }

  static defaultProps = {
    userInfo: {}
  }

  constructor() {
    this.state = {
      editInfoModal: {},
      editWorkExpModal: {},
      editEduExpModal: {},
      editInfo: false,
      editWork: false,
      editEdu: false
    }
  }

  async handleClickHeader() {
    const file = await Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
    })
    const result = await api.uploadHeader(file.tempFilePaths[0])
    const data = JSON.parse(result.data)
    if (data.code === 200) {
      this.props.getMyInfo()
      return
    }
    switch (data.code) {
      case 504:
        Taro.showToast({ title: '图片太大, 请更换', icon: 'none' })
        break
      default:
        Taro.showToast({ title: '上传失败, 请检查', icon: 'none' })
        break
    }
  }

  handleClickEditInfo() {
    const userInfo = this.props.userInfo.UserBase
    this.setState({
      editInfo: true,
      editInfoModal: {
        id: userInfo.id,
        ...userInfo
      }
    })
  }

  async submitEditInfo(userInfo) {
    const result = await api.editUserBase(userInfo)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideModal()
  }

  handleEditWorkExp(info) {
    this.setState({
      editWork: true,
      editWorkExpModal: {
        ...info
      }
    })
  }

  addWorkExp() {
    this.setState({
      editWork: true,
      editWorkExpModal: {
        id: -1,
        company: '',
        job: '',
        startTime: '',
        endTime: ''
      }
    })
  }

  async submitEditWorkExp(workExp) {
    const result = await api.editWorkExp(workExp)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideModal()
  }

  async deleteWorkExp(id) {
    const result = await api.deleteWorkExp(id)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideModal()
  }

  handleEditEduExp(info) {
    this.setState({
      editEdu: true,
      editEduExpModal: {
        ...info
      }
    })
  }

  addEduExp() {
    this.setState({
      editEdu: true,
      editEduExpModal: {
        id: -1,
        school: '',
        major: '',
        degree: '',
        startTime: '',
        endTime: ''
      }
    })
  }

  async submitEditEduExp(eduExp) {
    const result = await api.editEduExp(eduExp)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideModal()
  }

  async deleteEduExp(id) {
    const result = await api.deleteEduExp(id)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideModal()
  }

  hideModal() {
    this.setState({
      editEdu: false,
      editInfo: false,
      editWork: false
    })
  }

  handleCardEdit() {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        Taro.navigateTo({
          url: `/pages/uploadCard/uploadCard?path=${encodeURIComponent(tempFilePath)}`
        })
      }
    })
  }

  async onPullDownRefresh() {
    Taro.showLoading({ title: '获取数据', mask: true })
    try {
      await this.props.getMyInfo()
    } catch (e) {}
    Taro.stopPullDownRefresh()
    Taro.hideLoading()
  }

  onShareAppMessage() {
    return {
      title: `我在用片片, 这是我的名片`
    }
  }

  render () {
    const {
      UserBase: userBase,
      WorkExps: workExps,
      EduExps: eduExps
    } = this.props.userInfo
    return (
      <Authorized>
        <View className='p-me'>
          <View className='m-header'>
            <LargeHeader
              onClick={this.handleClickHeader.bind(this)}
              editable='true'
              headerPath={userBase.header} 
            />
          </View>
          <View className='m-info'>
            <UserInfo 
              info={userBase}
              editable='true'
              onClick={this.handleClickEditInfo.bind(this)}
            />
          </View>
          <View className='m-content'>
            <LightTitle text='工作经历' />
            <View className='m-workExp-list'>
              {
                workExps.map(workExp => (
                  <WorkExp 
                    editable='true'
                    info={workExp}
                    key={workExp.id}
                    onClick={this.handleEditWorkExp.bind(this)}
                  />
                ))
              }
              { workExps.length === 0 && <NoExpTitle text='暂无工作经历, 点击按钮立即添加' />}
              <Icon className='u-add' onClick={this.addWorkExp.bind(this)} />
            </View>
            <LightTitle text='教育经历' />
            <View className='m-eduExp-list'>
              {
                eduExps.map(eduExp => (
                  <EduExp 
                    editable='true'
                    info={eduExp}
                    key={eduExp.id}
                    onClick={this.handleEditEduExp.bind(this)}
                  />
                ))
              }
              { eduExps.length === 0 && <NoExpTitle text='暂无教育经历, 点击按钮立即添加' />}
              <Icon className='u-add' onClick={this.addEduExp.bind(this)} />
            </View>
          </View>
          <View className='m-card'>
            <SubTitle text='展示卡片' />
            <View className='u-card'>
            <Card 
              editable='true'
              imagePath={userBase.card}
              onClick={this.handleCardEdit.bind(this)}
            />
          </View>
          </View>
        </View>
          
        <EditInfo 
          info={this.state.editInfoModal}
          onCancel={this.hideModal.bind(this)}
          onSubmit={this.submitEditInfo.bind(this)}
          visible={this.state.editInfo} 
        />

        <EditWork 
          info={this.state.editWorkExpModal}
          onCancel={this.hideModal.bind(this)}
          onSubmit={this.submitEditWorkExp.bind(this)}
          onDelete={this.deleteWorkExp.bind(this)}
          visible={this.state.editWork} 
        />

        <EditEdu
          info={this.state.editEduExpModal}
          onCancel={this.hideModal.bind(this)}
          onSubmit={this.submitEditEduExp.bind(this)}
          onDelete={this.deleteEduExp.bind(this)}
          visible={this.state.editEdu} 
        />
      </Authorized>
            
    )
  }
}

export default Me
