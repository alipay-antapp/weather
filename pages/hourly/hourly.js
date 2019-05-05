import { getWeather } from '/utils/request.js';
Page({
  data: {
    hourlyData: []
  },
  onLoad(query) {
    this.getData(query);
  },
  getData(query) {
    let that = this;
    let baseUrl = 'https://free-api.heweather.net';
    let param = {
      location: query.location,
      key: query.key
    }
    let res = getWeather(baseUrl, '/s6/weather/hourly', param);
    res.then(result => {
      that.setData({
        hourlyData: result['HeWeather6'][0].hourly
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  }
});
