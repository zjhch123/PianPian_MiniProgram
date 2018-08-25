// components/Modal/Modal.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    visiable: Boolean,
  },
  data: {
    top: 0,
    leave: true,
  },
  attached() {
    const query = wx.createSelectorQuery()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      const windowHeight = wx.getSystemInfoSync().windowHeight
      this.setData({
        top: 0.1 * windowHeight + res[0].scrollTop,
        leave: false,
      });
    })
  },
  methods: {
    hideModal() {
      this.setData({
        leave: true
      })
      setTimeout(() => {
        this.setData({
          visiable: false,
          leave: false
        });
      }, 1000)
    },
  },
})
