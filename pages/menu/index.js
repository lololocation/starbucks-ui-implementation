Page({
  data: {
    categoryList: [
      { id: 1, name: '当季新品', enName: 'Seasonal Specials' },
      { id: 2, name: '经典咖啡', enName: 'Classic Coffee' },
      { id: 3, name: '星冰乐', enName: 'Frappuccino' },
      { id: 4, name: '茶瓦纳', enName: 'Teavana' },
      { id: 5, name: '蛋糕甜品', enName: 'Cake & Dessert' },
      { id: 6, name: '轻食简餐', enName: 'Light Meal' }
    ],
    productList: [
      {
        categoryId: 1,
        products: [
          { id: 101, name: '樱花拿铁', price: 38, desc: '特调风味，限定供应' },
          { id: 102, name: '樱花星冰乐', price: 36, desc: '樱花风味星冰乐，春季限定' },
          { id: 103, name: '樱花玛奇朵', price: 39, desc: '樱花风味与奶泡的完美融合' }
        ]
      },
      {
        categoryId: 2,
        products: [
          { id: 201, name: '美式咖啡', price: 28, desc: '纯粹咖啡香气，回味悠长' },
          { id: 202, name: '拿铁', price: 32, desc: '丝滑牛奶与浓郁咖啡的经典搭配' },
          { id: 203, name: '卡布奇诺', price: 34, desc: '丰富奶泡，口感醇厚' },
          { id: 204, name: '焦糖玛奇朵', price: 35, desc: '香草糖浆与浓缩咖啡的完美融合' }
        ]
      },
      {
        categoryId: 3,
        products: [
          { id: 301, name: '抹茶星冰乐', price: 36, desc: '抹茶粉与牛奶的清凉组合' },
          { id: 302, name: '摩卡星冰乐', price: 38, desc: '巧克力与咖啡的冰凉体验' },
          { id: 303, name: '焦糖星冰乐', price: 36, desc: '焦糖风味冰沙，夏日清凉' }
        ]
      },
      {
        categoryId: 4,
        products: [
          { id: 401, name: '柠檬蜂蜜红茶', price: 32, desc: '清新柠檬配蜂蜜红茶' },
          { id: 402, name: '冰摇桃桃乌龙茶', price: 35, desc: '桃果风味与乌龙茶的清爽' }
        ]
      },
      {
        categoryId: 5,
        products: [
          { id: 501, name: '提拉米苏', price: 32, desc: '意式经典甜品' },
          { id: 502, name: '纽约芝士蛋糕', price: 30, desc: '浓郁芝士，口感细腻' }
        ]
      },
      {
        categoryId: 6,
        products: [
          { id: 601, name: '火腿芝士可颂', price: 28, desc: '酥脆可颂夹着火腿芝士' },
          { id: 602, name: '金枪鱼三明治', price: 35, desc: '新鲜金枪鱼配蔬菜' }
        ]
      }
    ],
    currentIndex: 0,
    scrollTop: 0,
    toView: ''
  },

  onLoad: function(options) {
    
  },

  // 切换分类
  switchCategory(e) {
    const index = e.currentTarget.dataset.index;
    const categoryId = this.data.categoryList[index].id;
    
    this.setData({
      currentIndex: index,
      toView: `section-${categoryId}`
    });
  },
  
  // 监听右侧滚动事件
  onRightScroll: function(e) {
    // 防抖处理，避免频繁触发
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    
    this.scrollTimer = setTimeout(() => {
      const query = wx.createSelectorQuery();
      
      // 收集所有分类区域的位置信息
      const promises = [];
      
      for (let i = 0; i < this.data.categoryList.length; i++) {
        const categoryId = this.data.categoryList[i].id;
        promises.push(
          new Promise((resolve) => {
            query.select(`#section-${categoryId}`).boundingClientRect((rect) => {
              resolve({ index: i, categoryId, rect });
            }).exec();
          })
        );
      }
      
      Promise.all(promises).then(results => {
        // 找到距离顶部最近的且在可视区域内的分类
        let activeIndex = 0;
        for (let i = 0; i < results.length; i++) {
          const res = results[i];
          if (res.rect && res.rect.top <= 10) { // 10rpx的容差
            activeIndex = res.index;
          }
        }
        
        // 只有当分类发生变化时才更新
        if (activeIndex !== this.data.currentIndex) {
          this.setData({
            currentIndex: activeIndex
          });
        }
      });
    }, 100); // 100ms防抖
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

  // 添加到购物车
  addToCart(e) {
    const id = e.currentTarget.dataset.id;
    
    // 根据ID查找商品信息
    let product = null;
    for (let i = 0; i < this.data.productList.length; i++) {
      const category = this.data.productList[i];
      const found = category.products.find(p => p.id == id);
      if (found) {
        product = found;
        break;
      }
    }
    
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