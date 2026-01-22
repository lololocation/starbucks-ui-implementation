Page({
  data: {
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0
  },

  onLoad: function(options) {
    
  },

  onShow: function() {
    this.updateCartData();
  },

  // 更新购物车数据
  updateCartData() {
    const app = getApp();
    const cartItems = app.getCartItems();
    
    // 计算总价
    const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    const totalQuantity = app.getCartTotal();
    
    this.setData({
      cartItems: cartItems,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity
    });
  },

  // 增加商品数量
  increaseQuantity(e) {
    const index = e.currentTarget.dataset.index;
    const cartItems = this.data.cartItems;
    const item = cartItems[index];
    
    // 更新全局购物车
    const app = getApp();
    app.addToCart(item, 1); // 添加1个
    
    this.updateCartData(); // 更新显示
  },

  // 减少商品数量
  decreaseQuantity(e) {
    const index = e.currentTarget.dataset.index;
    const cartItems = this.data.cartItems;
    const item = cartItems[index];
    
    if (item.quantity <= 1) {
      // 如果数量为1，则询问是否删除
      wx.showModal({
        title: '提示',
        content: '确定要从购物车中移除该商品吗？',
        success: (res) => {
          if (res.confirm) {
            cartItems.splice(index, 1);
            const app = getApp();
            app.globalData.cart = cartItems;
            wx.setStorageSync('cart', cartItems);
            this.updateCartData();
          }
        }
      });
    } else {
      // 减少数量
      const app = getApp();
      // 更新全局购物车，将数量设置为减少1
      const newCart = app.getCartItems();
      const existingItem = newCart.find(i => i.id === item.id && i.size === item.size);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          const idx = newCart.findIndex(i => i.id === item.id && i.size === item.size);
          newCart.splice(idx, 1);
        }
        app.globalData.cart = newCart;
        wx.setStorageSync('cart', newCart);
      }
      this.updateCartData();
    }
  },

  // 清空购物车
  clearCart() {
    wx.showModal({
      title: '提示',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          app.clearCart();
          this.updateCartData();
        }
      }
    });
  },

  // 结算
  checkout() {
    if (this.data.cartItems.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      });
      return;
    }
    
    wx.showToast({
      title: '结算功能开发中...',
      icon: 'none'
    });
  },

  onShareAppMessage: function() {
    
  }
})