import { getWeather } from '/utils/request.js';
Page({
  data: {
    lifeKeys: {
      comf: '舒适度指数',
      cw: '洗车指数',
      drsg: '穿衣指数',
      flu: '感冒指数',
      sport: '运动指数',
      trav: '旅游指数',
      uv: '紫外线指数',
      air: '空气污染扩散条件指数',
      ac: '空调开启指数',
      ag: '过敏指数',
      gl: '太阳镜指数',
      mu: '化妆指数',
      airc: '晾晒指数',
      ptfc: '交通指数',
      fsh: '钓鱼指数',
      spi:'防晒指数'
    },
    lifeData: []
  },
  onLoad(query) {
    console.log(query)
    this.getData(query);
  },
  getData(query) {
    let that = this;
    let baseUrl = 'https://free-api.heweather.net';
    let param = {
      location: query.location,
      key: query.key
    }
    let res = getWeather(baseUrl, '/s6/weather/lifestyle', param);
    res.then(result => {
      that.setData({
        lifeData: result['HeWeather6'][0].lifestyle 
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  }
});
