Page({
  data: {
    orderList: [
      { id: 1, title: '焦糖玛奇朵', price: 35, count: 1, status: '配送中', date: '2026-01-18' },
      { id: 2, title: '提拉米苏', price: 32, count: 1, status: '已完成', date: '2026-01-15' },
      { id: 3, title: '樱花拿铁', price: 38, count: 2, status: '已完成', date: '2026-01-10' }
    ]
  },

  onLoad: function(options) {
    
  },

  onShow: function() {
    
  },

  // 查看订单详情
  viewOrderDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order/detail?id=${id}`
    });
  },

  onShareAppMessage: function() {
    
  }
})