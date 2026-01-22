Page({
  data: {
    bannerList: [
      { id: 1, title: '春季新品', subtitle: '限定供应' },
      { id: 2, title: '星冰乐', subtitle: '夏日清凉' },
      { id: 3, title: '会员专享', subtitle: '更多优惠' }
    ],
    recommendList: [
      { id: 202, name: '拿铁', price: 32, desc: '丝滑牛奶与浓郁咖啡的经典搭配' },
      { id: 201, name: '美式咖啡', price: 28, desc: '纯粹咖啡香气，回味悠长' },
      { id: 101, name: '樱花拿铁', price: 38, desc: '特调风味，限定供应' }
    ]
  },

  onLoad: function(options) {
    
  },

  onShow: function() {
    
  },

  // 查看商品详情
  viewProductDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/detail?id=${id}`
    });
  },

  // 阻止事件冒泡
  stopTap(e) {
    e.stopPropagation();
  },

  addToCart(e) {
    const id = e.currentTarget.dataset.id;
    
    // 根据ID查找商品信息
    const product = this.data.recommendList.find(p => p.id == id);
    
    if (product) {
      // 添加到全局购物车
      const app = getApp();
      app.addToCart(product, 1);
      
      wx.showToast({
        title: '已添加到购物车',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '商品不存在',
        icon: 'none'
      });
    }
  },

  onShareAppMessage: function() {
    
  }
})