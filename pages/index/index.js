Page({
  data: {
    classTitle: ['国内', '社会', '国际', '财经', '娱乐', '体育', '军事', '凑数的', '其他'],
    latestImgUrls: [
      'http://i2.chinanews.com/simg/2019/190422//98257910.JPG', '../../images/test2.jpg', '../../images/test3.jpg'
    ]

  },
  onLoad() {}
    /*API接入
    wx.request({
      url: 'https://route.showapi.com/109-35',
      data: {
        "showapi_appid": '92969', //这里需要改成自己的appid
        "showapi_sign": 'eedcb02a3323485a84c33b72074df757', //这里需要改成自己的应用的密钥secret
        "channelId": "5572a109b3cdc86cf39001db",
        "channelName": "国内最新",
        "title": "",
        "page": "1",
        "needContent": "0",
        "needHtml": "0",
        "needAllList": "0",
        "maxResult": "20",
        "id": ""
      },
      header: {
        'content-type': 'application/json' },
      success: res => {
        let newsData = res.data
        console.log(newsData.showapi_res_body.pagebean.contentlist[0])
      }
    })
  },

  /*点击轮播图时，跳转到相关新闻
   onSwiperTap:()=>{
wx.navigateTo({
  url: '',
})
   }*/
})