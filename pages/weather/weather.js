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
    nowLocal: {
      locationName: '',
      update: {},
      now: {},
      hourly: [],
      daily_forecast: [],
      lifestyle: []
    },
    location: '',
    key: 'd2501cb604437c8c063f0b5bc69e35',

    cityList: [],
    arrIndex: 0,
  },
  onLoad() {
    this.getMyLocation();
  },
  /**
   * 获取当前位置经纬度
   */
  getMyLocation() {
    let that = this;
    my.getLocation({
      success(res) {
        my.hideLoading();
        /* that对象为Page可以设置数据刷新界面
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude)
        })
        */
        // that.getLocationName(res);
        that.getLastWeather(res, '', 'now');
        that.getLastWeather(res, '', 'forecast');
        that.getLastWeather(res, '', 'hourly');
        that.getLastWeather(res, '', 'lifestyle');
      },
      fail() {
        my.hideLoading();
        my.alert({ title: '定位失败,默认显示杭州天气' });
        that.getLastWeather({ longitude: '120.124871', latitude: '30.276996' }, '', 'now');
        that.getLastWeather({ longitude: '120.124871', latitude: '30.276996' }, '', 'forecast');
        that.getLastWeather({ longitude: '120.124871', latitude: '30.276996' }, '', 'hourly');
        that.getLastWeather({ longitude: '120.124871', latitude: '30.276996' }, '', 'lifestyle');
      },
    })
  },

  /**
   * 根据当前位置经纬度获取城市名
   */
  getLocationName(location) {
    let that = this;
    let baseUrl = 'https://search.heweather.net';
    let param = {
      location: location.longitude +','+location.latitude,
      key: `4b${that.data.key}`
    }
    let res = getWeather(baseUrl, '/find', param);
    res.then(result => {
      that.setData({
        'nowLocal.locationName': result['HeWeather6'][0].basic[0].location
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  },

  /**
   * 根据当前位置经纬度获取3-7天天气预报、实况天气、逐小时天气预报以及生活指数，
   */
  getLastWeather(location,name,type) {
    let that = this;
    let baseUrl = 'https://free-api.heweather.net';
    let param = {
      location: !!location? location.longitude +','+location.latitude : name,
      key: `4b${that.data.key}`
    }
    let res = getWeather(baseUrl, '/s6/weather/'+type, param);
    res.then(result => {
      that.setData({
        location: param.location,
        'nowLocal.locationName': result['HeWeather6'][0].basic.location,
        'nowLocal.update': result['HeWeather6'][0].update,
        'nowLocal.now': result['HeWeather6'][0].now,
        'nowLocal.hourly': result['HeWeather6'][0].hourly,
        'nowLocal.daily_forecast': result['HeWeather6'][0].daily_forecast,
        'nowLocal.lifestyle': result['HeWeather6'][0].lifestyle,
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  },

  /**
   * 去选择其他城市
   */
  toSelectCity() {
    let that = this;
    my.chooseCity({
      showLocatedCity: true,
      success: (res) => {
        that.getLastWeather('', res.city, 'now');
        that.getLastWeather( '', res.city, 'forecast');
        that.getLastWeather( '', res.city, 'hourly');
        that.getLastWeather( '', res.city, 'lifestyle');
      },
    });
    // that.getcity();
  },

  /**
   * 获取城市列表
   */
  getcity() {
    let that = this;
    let baseUrl = 'https://search.heweather.net';
    let param = {
      group: 'cn',
      number: 50,
      key: `4b${that.data.key}`
    }
    let res = getWeather(baseUrl, '/top', param);
    res.then(result => {
      that.setData({
        cityList: result['HeWeather6'][0].basic[0]
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  },

  pickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      arrIndex: e.detail.value,
    });
  },

  /**
   * 更多小时
   */
  toMoreHourly() {
    let that = this;
    my.navigateTo({
      url: `/pages/hourly/hourly?location=${that.data.location}&key=4b${that.data.key}`
    })
  },
  /**
   * 更多天天气
   */
  toMoreDaily() {
    let that = this;
    my.navigateTo({
      url: `/pages/daily/daily?location=${that.data.location}&key=4b${that.data.key}`
    })
  },
  /**
   * 更多生活指数
   */
  toMoreLifestyle() {
    let that = this;
    my.navigateTo({
      url: `/pages/lifestyle/lifestyle?location=${that.data.location}&key=4b${that.data.key}`
    })
  },
});
