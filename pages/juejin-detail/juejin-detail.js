import { dataRequest } from '/utils/request.js';
let wxParse = require('/utils/wxParse/wxParse.js');
Page({
  data: {
    objectId: '',
    htmlContent: '',
    emptyData: {
      icon: 'iconshuju',
      text: '暂无详细数据',
      show: false,
      height: my.getSystemInfoSync().windowHeight
    }
  },
  onLoad(query) {
    let that = this;
    my.setNavigationBar({
      title: query.title,
      backgroundColor: '#108ee9'
    })
    that.setData({
      objectId: query.objectId
    })
    that.getDetailData(query.objectId);
  },
  getDetailData(objectId) {
    let that = this;
    let baseUrl = 'https://post-storage-api-ms.juejin.im';
    let param = {
      src: 'web',
      uid: '',
      device_id: '',
      token: '',
      type: 'entryView',
      postId: objectId
    }
    let res = dataRequest(baseUrl, '/v1/getDetailData', param);
    res.then(result => {
      // console.log(JSON.stringify(result))
      let htmlContent = result.d.transcodeContent.replace(/['二维码'|'腾讯'|'妈逼'|'操']/g, '*');
      that.setData({
        objectId,
        'emptyData.show': !!htmlContent? false : true,
        htmlContent: result.d.transcodeContent.replace(/['二维码'|'腾讯'|'妈逼'|'操']/g, '*')
      })
      wxParse.wxParse('htmlContent', 'html', htmlContent, that, 5);
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  },
  refreshData() {
    let that = this;
    that.getDetailData(that.data.objectId);
  }
});

