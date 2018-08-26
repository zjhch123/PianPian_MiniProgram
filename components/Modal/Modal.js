// components/Modal/Modal.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    visiable: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        if (newVal === true) {
          this.showModal()
        } else {
          this.hideModal()
        }
      }
    },
    submit: String,
  },
  data: {
    top: 0,
    leave: false,
    show: false,
  },
  attached() {
  },
  methods: {
    showModal() {
      const windowHeight = wx.getSystemInfoSync().windowHeight
      const query = wx.createSelectorQuery()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        this.setData({
          show: true,
          top: 0.06 * windowHeight + res[0].scrollTop
        })
      })
    },
    hideModal() {
      this.setData({
        leave: true
      })
      setTimeout(() => {
        this.setData({
          show: false,
          leave: false
        });
      }, 900)
    },
    submitModal() {
      this.triggerEvent(this.data.submit);
    },
    setVisiableFalse() {
      this.setData({
        visiable: false,
      })
    },
  },
})
