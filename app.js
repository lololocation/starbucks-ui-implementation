App({
  onLaunch: function () {
    console.log('App Launch');
    // 初始化购物车数据
    this.globalData.cart = wx.getStorageSync('cart') || [];
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
  globalData: {
    userInfo: null,
    cart: [], // 购物车数组
    debounceTimer: null // 防抖定时器
  },
  
  // 添加到购物车
  addToCart: function(product, quantity = 1) {
    const cart = this.globalData.cart || [];
    const existingItem = cart.find(item => item.id === product.id && item.size === product.size);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: product.size || '默认',
        image: product.image || ''
      };
      cart.push(cartItem);
    }
    
    this.globalData.cart = cart;
    wx.setStorageSync('cart', cart); // 同步到本地存储
    
    return cart;
  },
  
  // 获取购物车商品总数
  getCartTotal: function() {
    const cart = this.globalData.cart || wx.getStorageSync('cart') || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
  
  // 获取购物车列表
  getCartItems: function() {
    return this.globalData.cart || wx.getStorageSync('cart') || [];
  },
  
  // 清空购物车
  clearCart: function() {
    this.globalData.cart = [];
    wx.removeStorageSync('cart');
  },
  
  // 防抖函数
  debounce: function(func, delay) {
    const self = this;
    if (self.globalData.debounceTimer) {
      clearTimeout(self.globalData.debounceTimer);
    }
    self.globalData.debounceTimer = setTimeout(function() {
      func();
    }, delay);
  }
})