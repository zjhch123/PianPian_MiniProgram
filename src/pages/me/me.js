import Taro, { Component } from '@tarojs/taro'
import { View, Icon, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { LargeHeader } from '../../components/UserHeader'
import UserInfo from '../../components/UserInfo'
import { LightTitle, SubTitle } from '../../components/Title'
import { WorkExp, EduExp } from '../../components/Experience'
import { Card } from '../../components/Card'
import NoLogin from '../../components/NoLogin'
import { EditInfo, EditWork, EditEdu } from '../../components/Modal'
import api from '../../api'

import { getMyInfo } from '../../actions/user'

import './index.scss'


@connect(({ user }) => ({
  user
}), (dispatch) => ({
  getMyInfo() {
    dispatch(getMyInfo())
  }
}))
class Me extends Component {

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

  componentDidMount() {
    this.props.getMyInfo()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClickHeader(e) {
    console.log(e)
  }

  handleClickEditInfo() {
    const userInfo = this.props.user.userInfo.UserBase
    this.setState({
      editInfo: true,
      editInfoModal: {
        id: userInfo.id,
        ...userInfo
      }
    })
  }

  hideEditInfo() {
    this.setState({
      editInfo: false
    })
  }

  async submitEditInfo(userInfo) {
    const result = await api.editUserBase(userInfo)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideEditInfo()
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

  hideEditWorkExp() {
    this.setState({
      editWork: false
    })
  }

  async submitEditWorkExp(workExp) {
    const result = await api.editWorkExp(workExp)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideEditWorkExp()
  }

  async deleteWorkExp(id) {
    const result = await api.deleteWorkExp(id)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideEditWorkExp()
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
    this.hideEditEduExp()
  }

  async deleteEduExp(id) {
    const result = await api.deleteEduExp(id)
    if (result.data.code !== 200) {
      return
    }
    this.props.getMyInfo()
    this.hideEditEduExp()
  }

  hideEditEduExp() {
    this.setState({
      editEdu: false
    })
  }

  handleCardEdit(e) {
    console.log(e)
  }

  render () {
    const {
      UserBase: userBase,
      WorkExps: workExps,
      EduExps: eduExps
    } = this.props.user.userInfo
    return (
      <View className={`p-me ${this.props.user.isLogin ? '' : 'f-noLogin'}}`}>
        <View className='f-isLogin'>
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
              { workExps.length === 0 && <View className='u-no-exp'><Text>暂无工作经历, 点击按钮立即添加</Text></View>}
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
              { eduExps.length === 0 && <View className='u-no-exp'><Text>暂无教育经历, 点击按钮立即添加</Text></View>}
              <Icon className='u-add' onClick={this.addEduExp.bind(this)} />
            </View>
          </View>
          <View className='m-card'>
          <SubTitle text='展示卡片' />
          <View className='u-card'>
            <Card 
              editable='true'
              onClick={this.handleCardEdit.bind(this)}
            />
          </View>
        </View>
        </View>

        <View className='f-notLogin'>
          <NoLogin />
        </View>

        <EditInfo 
          info={this.state.editInfoModal}
          onCancel={this.hideEditInfo.bind(this)}
          onSubmit={this.submitEditInfo.bind(this)}
          visible={this.state.editInfo} 
        />

        <EditWork 
          info={this.state.editWorkExpModal}
          onCancel={this.hideEditWorkExp.bind(this)}
          onSubmit={this.submitEditWorkExp.bind(this)}
          onDelete={this.deleteWorkExp.bind(this)}
          visible={this.state.editWork} 
        />

        <EditEdu
          info={this.state.editEduExpModal}
          onCancel={this.hideEditEduExp.bind(this)}
          onSubmit={this.submitEditEduExp.bind(this)}
          onDelete={this.deleteEduExp.bind(this)}
          visible={this.state.editEdu} 
        />
            
      </View>
    )
  }
}

export default Me
