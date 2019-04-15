import { getWeather } from '/utils/request.js';
Page({
  data: {
    dailyData: []
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
    let res = getWeather(baseUrl, '/s6/weather/forecast', param);
    res.then(result => {
      that.setData({
        dailyData: result['HeWeather6'][0].daily_forecast 
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  }
});
