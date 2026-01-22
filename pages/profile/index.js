Page({
  data: {
    userInfo: {
      nickName: 'Starbucks Lover',
      avatarUrl: '',
      memberLevel: '金星级',
      points: 1280
    },
    serviceList: [
      { id: 1, name: '会员权益', icon: '🌟' },
      { id: 2, name: '我的券包', icon: '🎟️' },
      { id: 3, name: '地址管理', icon: '📍' },
      { id: 4, name: '客服中心', icon: '💬' },
      { id: 5, name: '设置', icon: '⚙️' }
    ]
  },

  onLoad: function(options) {
    
  },

  onShow: function() {
    
  },

  onShareAppMessage: function() {
    
  }
})