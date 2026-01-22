Page({
  data: {
    product: {},
    currentIndex: 0,
    quantity: 1
  },

  onLoad: function(options) {
    // 获取传入的商品ID
    const productId = options.id;
    
    // 根据ID查找商品详情（这里使用模拟数据）
    const product = this.findProductById(productId);
    
    this.setData({
      product: product || {}
    });
  },

  // 根据ID查找商品
  findProductById(id) {
    // 这里是模拟数据，实际应用中应该从API获取
    const allProducts = [
      { id: 101, name: '樱花拿铁', price: 38, desc: '特调风味，限定供应', image: '', category: '当季新品', 
        detailDesc: '樱花风味的特色拿铁，选用优质咖啡豆与樱花糖浆完美融合，顶部配有细腻奶泡和樱花装饰。春季限定，品味浪漫春日气息。', 
        ingredients: ['浓缩咖啡', '牛奶', '樱花糖浆', '淡奶油'], 
        sizes: ['中杯', '大杯', '超大杯'],
        nutrition: { calories: 180, protein: 8, carbs: 22, fat: 6 }
      },
      { id: 102, name: '樱花星冰乐', price: 36, desc: '樱花风味星冰乐，春季限定', image: '', category: '当季新品', 
        detailDesc: '冰爽清新的樱花星冰乐，融合了樱花风味糖浆与浓郁咖啡，顶部配有鲜奶油，带来独特的春季体验。', 
        ingredients: ['樱花风味糖浆', '咖啡', '牛奶', '冰块', '鲜奶油'], 
        sizes: ['中杯', '大杯'],
        nutrition: { calories: 220, protein: 5, carbs: 35, fat: 8 }
      },
      { id: 201, name: '美式咖啡', price: 28, desc: '纯粹咖啡香气，回味悠长', image: '', category: '经典咖啡', 
        detailDesc: '选用优质阿拉比卡咖啡豆，经过深度烘焙，呈现出纯净的咖啡香味。口感醇厚，回味悠长，是咖啡爱好者的首选。', 
        ingredients: ['精选咖啡豆', '水'], 
        sizes: ['中杯', '大杯', '超大杯'],
        nutrition: { calories: 5, protein: 0, carbs: 0, fat: 0 }
      },
      { id: 202, name: '拿铁', price: 32, desc: '丝滑牛奶与浓郁咖啡的经典搭配', image: '', category: '经典咖啡', 
        detailDesc: '浓缩咖啡与丝滑牛奶的完美融合，口感顺滑细腻，咖啡香气浓郁，是经典的意式咖啡饮品。', 
        ingredients: ['浓缩咖啡', '牛奶'], 
        sizes: ['中杯', '大杯', '超大杯'],
        nutrition: { calories: 120, protein: 8, carbs: 12, fat: 6 }
      },
      { id: 301, name: '抹茶星冰乐', price: 36, desc: '抹茶粉与牛奶的清凉组合', image: '', category: '星冰乐', 
        detailDesc: '精选日本抹茶粉与香浓牛奶制成的冰爽饮品，顶部配有鲜奶油，带来独特的清凉体验。', 
        ingredients: ['抹茶粉', '牛奶', '冰块', '鲜奶油', '糖浆'], 
        sizes: ['中杯', '大杯'],
        nutrition: { calories: 280, protein: 7, carbs: 42, fat: 10 }
      },
      { id: 401, name: '柠檬蜂蜜红茶', price: 32, desc: '清新柠檬配蜂蜜红茶', image: '', category: '茶瓦纳', 
        detailDesc: '精选优质红茶，搭配新鲜柠檬片和纯正蜂蜜，口感清香甘甜，是一款健康养生的饮品。', 
        ingredients: ['红茶', '柠檬', '蜂蜜', '水'], 
        sizes: ['中杯', '大杯'],
        nutrition: { calories: 110, protein: 0, carbs: 28, fat: 0 }
      },
      { id: 501, name: '提拉米苏', price: 32, desc: '意式经典甜品', image: '', category: '蛋糕甜品', 
        detailDesc: '经典意大利甜品，融合了马斯卡彭奶酪的香滑、手指饼干的柔软和咖啡的香醇，口感层次丰富。', 
        ingredients: ['马斯卡彭奶酪', '手指饼干', '咖啡', '鸡蛋', '糖'], 
        sizes: ['单份', '双人份'],
        nutrition: { calories: 350, protein: 8, carbs: 32, fat: 22 }
      }
    ];
    
    return allProducts.find(item => item.id == id);
  },

  // 切换规格
  switchSize(e) {
    const sizeIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: sizeIndex
    });
  },

  // 增加数量
  increaseQuantity() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  // 减少数量
  decreaseQuantity() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  // 添加到购物车
  addToCart() {
    if (!this.data.product || !this.data.product.id) {
      wx.showToast({
        title: '商品信息不存在',
        icon: 'none'
      });
      return;
    }
    
    // 构建商品对象
    const product = {
      id: this.data.product.id,
      name: this.data.product.name,
      price: this.data.product.price,
      size: this.data.product.sizes[this.data.currentIndex],
      image: this.data.product.image
    };
    
    // 添加到全局购物车
    const app = getApp();
    app.addToCart(product, this.data.quantity);
    
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success'
    });
  },

  // 立即购买
  buyNow() {
    wx.showToast({
      title: '功能开发中...',
      icon: 'none'
    });
  },

  onShareAppMessage: function() {
    
  }
})