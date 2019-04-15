import { getRequest } from '/utils/request.js';
Page({
  data: {
    page: 1,
    listData:[
{
    "author":
    {
        "avatar_url": "https://avatars1.githubusercontent.com/u/1147375?v=4&s=120",
        "loginname": "alsotang"
    },
    "author_id": "504c28a2e2b845157708cb61",
    "create_at": "2018-10-27T14:33:14.694Z",
    "good": false,
    "id": "5bd4772a14e994202cd5bdb7",
    "last_reply_at": "2019-03-22T02:33:51.713Z",
    "reply_count": 178,
    "tab": "share",
    "title": "服务器迁移至 aws 日本机房",
    "top": true,
    "visit_count": 18457
},
{
    "author":
    {
        "avatar_url": "https://avatars2.githubusercontent.com/u/2081487?v=4&s=120",
        "loginname": "lellansin"
    },
    "author_id": "51f0f267f4963ade0e08f503",
    "create_at": "2019-02-25T12:04:18.826Z",
    "good": false,
    "id": "5c73d9c2ab86b86ddf6b2b4a",
    "last_reply_at": "2019-03-21T01:39:18.715Z",
    "reply_count": 41,
    "tab": "share",
    "title": "Node 地下铁第八期「上海站」线下沙龙邀约 - Let's Go Serverless!",
    "top": true,
    "visit_count": 3909
},
{
    "author":
    {
        "avatar_url": "https://avatars2.githubusercontent.com/u/46184813?v=4&s=120",
        "loginname": "gougou168"
    },
    "author_id": "5c247db93898674067a78f02",
    "create_at": "2019-03-04T02:29:31.323Z",
    "good": false,
    "id": "5c7c8d8b5b8cb21491ca56b6",
    "last_reply_at": "2019-03-22T13:42:04.261Z",
    "reply_count": 11,
    "tab": "ask",
    "title": "egg.js中实现RESTfull api，vue请求post数据提示 missing csrf token",
    "top": false,
    "visit_count": 693
},
{
    "author":
    {
        "avatar_url": "https://avatars3.githubusercontent.com/u/5512552?v=4&s=120",
        "loginname": "timqian"
    },
    "author_id": "55c56e8a39273b9219336288",
    "create_at": "2019-03-22T12:08:48.256Z",
    "good": false,
    "id": "5c94d050fd41137eb76609af",
    "last_reply_at": "2019-03-22T12:08:48.256Z",
    "reply_count": 0,
    "tab": "share",
    "title": "茶余饭后收集了一张提供工作机会的开源项目的列表，欢迎一起作为 markdown 工程师来改进它",
    "top": false,
    "visit_count": 38
},
{
    "author":
    {
        "avatar_url": "https://avatars0.githubusercontent.com/u/449224?v=4&s=120",
        "loginname": "jiyinyiyong"
    },
    "author_id": "4efc278525fa69ac69000141",
   "create_at": "2019-03-22T07:11:39.718Z",
    "good": false,
    "id": "5c948aabfd41137eb76607eb",
    "last_reply_at": "2019-03-22T11:26:39.857Z",
    "reply_count": 7,
    "tab": "ask",
    "title": "proc.kill 的默认行为如何理解?",
    "top": false,
    "visit_count": 100
},
{
    "author":
    {
        "avatar_url": "https://avatars1.githubusercontent.com/u/29170168?v=4&s=120",
        "loginname": "dkvirus"
    },
    "author_id": "5adecaa3a86ec1f308ec2480",
    "create_at": "2019-03-15T02:13:30.302Z",
    "good": false,
    "id": "5c8b0a4a7ce0df3732428254",
    "last_reply_at": "2019-03-22T11:03:15.889Z",
    "reply_count": 35,
    "tab": "ask",
    "title": "关于 Nodejs 服务器高并发的疑问",
    "top": false,
    "visit_count": 1268
},
{
    "author":
    {
        "avatar_url": "https://avatars0.githubusercontent.com/u/376338?v=4&s=120",
        "loginname": "meikidd"
    },
    "author_id": "5372465f3c72496d41009adc",
   "create_at": "2019-01-04T04:11:13.570Z",
    "good": false,
    "id": "5c2edce13898674067a7b103",
    "last_reply_at": "2019-03-22T08:31:23.310Z",
    "reply_count": 362,
    "tab": "share",
    "title": "送几本《Node.js开发实战》",
    "top": false,
    "visit_count": 11722
},
],
    emptyData: {
      icon: 'iconshuju',
      text: '暂无详细数据',
      show: false,
      height: my.getSystemInfoSync().windowHeight
    }
  },
  onLoad(query) {
    // 页面加载
    let that = this;
    // that.getListData();
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
    let that = this;
    that.data.page = 1;
    // that.getListData();
  },
  onReachBottom() {
    // 页面被拉到底部
    let that = this;
    that.data.page++;
    // that.getListData();
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  getListData() {
    let that = this;
    let baseUrl = 'https://cnodejs.org';
    let param = {
      page: that.data.page
    }
    let res = getRequest(baseUrl, '/api/v1/topics', param);
    res.then(result => {
      let listData = result.data;
      console.log(JSON.stringify(listData))
      if (that.data.page != 1 && !!listData && !!listData.length) {
        let newData = JSON.parse(JSON.stringify(that.data.listData));
        result.data.forEach(ele => {
          ele.title = ele.title.replace(/['二维码'|'腾讯'|'妈逼'|'操']/g, '*')
          newData.push(ele);
        })
        that.setData({
          'emptyData.show': !!listData.length? false: true,
          listData: newData
        })
        return false;
      }
      that.setData({
        listData,
        cellWidth: my.getSystemInfoSync().windowWidth
      })
    }).catch(()=>{
      that.setData({
        'emptyData.show': true
      })
    })
  },
  toDetail(e) {
    let that = this;
    let title = e.target.dataset.title;
    let id = e.target.dataset.topicId;
    my.navigateTo({
      url: `/pages/node-detail/node-detail?topicId=${id}&title=${title}`
    })
  },
  refreshData() {
    let that = this;
    // that.getListData();
  }
});
