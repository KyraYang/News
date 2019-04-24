const channelTitleMap = {
  'gn': '国内',
  'gj': '国际',
  'cj': '财经',
  'hlw': '互联网',
  'ty': '体育',
  'kj': '科技',
  'sh': '社会',
  'yl': '娱乐',
  'js': '军事',
}
const channelIdMap = {

}
Page({
  data: {
    focusedNews: [{
      "id": 1552623252492,
      "title": "阿尔斯通高管新书《美国陷阱》揭露 美用司法武器实施全球经济战",
      "date": "2019-03-14T09:47:37.000Z",
      "source": "参考消息",
      "img": "//inews.gtimg.com/newsapp_bt/0/8139088294/641"
    }, {
      "id": 1552623252496,
      "title": "迪士尼收购福克斯，网飞上位，好莱坞“ 新六大” 重 新洗牌",
      "date": "2019-03-14T04:12:08.000Z",
      "source": "犀牛娱乐官方",
      "img": "//inews.gtimg.com/newsapp_bt/0/8133794933/641"
    }, {
      "id": 1552623252499,
      "title": "实现性别平等——来自全球的有影响力女性联大发声",
      "date": "2019-03-14T04:01:55.000Z",
      "source": "新华网",
      "img": "//inews.gtimg.com/newsapp_bt/0/8132916838/641"
    }],
    newsList: [{
        "title": "外媒称香港回归15年打破“经济将死”预言",
        "date": "2012-07-01T09:34:12.000Z",
        "source": "中国新闻网",
        "img": "http://img1.gtimg.com/news/pics/hv1/38/85/1076/69988613.jpg"
      }, {
        "id": 1519631218591,
        "title": "实德指媒体窃公司机密 已向某媒体递律师函",
        "date": "2012-04-21T11:32:04.000Z",
        "source": "腾讯财经",
        "img": "http://img1.gtimg.com/finance/pics/hv1/33/207/1023/66573393.jpg"
      },
      {
        "id": 1519631218595,
        "title": "公务员医疗费用成迷 学者呼吁管理应公开透明",
        "date": "2012-02-26T08:13:00.000Z",
        "source": "财新网",
        "img": "http://img1.gtimg.com/finance/pics/hv1/241/102/983/63945826.jpg"
      }, {
        "id": 1552623252481,
        "title": "王欣会：希望让“来自星星的孩子”有机会过上平等有尊严的生活",
        "date": "2019-03-15T04:09:11.000Z",
        "source": "新华网/中国政府网",
        "img": "//inews.gtimg.com/newsapp_bt/0/8148265330/641"
      }, {
        "id": 1552623252486,
        "title": "支月英：我希望有更多优秀青年投入到乡村教育 助力乡村全面振兴",
        "date": "2019-03-15T04:08:31.000Z",
        "source": "新华网/中国政府网",
        "img": "//inews.gtimg.com/newsapp_bt/0/8148265329/641"
      }
    ]

  },
  onLoad() {
    //set channel bar
    let channelTitle = []
    for (let x in channelTitleMap) {
      channelTitle.push(channelTitleMap[x])
    }
    this.setData({
      channelTitle: channelTitle
    })}
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
        'content-type': 'application/json'
      },
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