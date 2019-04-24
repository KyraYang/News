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
  //焦点新闻, 
  'gn': "5572a108b3cdc86cf39001cd",
  'gj': "5572a108b3cdc86cf39001ce",
  'cj': "5572a108b3cdc86cf39001d0",
  'hlw': "5572a108b3cdc86cf39001d1",
  'ty': "5572a108b3cdc86cf39001d4",
  'kj': "5572a108b3cdc86cf39001d9",
  'sh': "5572a109b3cdc86cf39001da",
  'yl': "5572a108b3cdc86cf39001d5",
  'js': "5572a108b3cdc86cf39001cf",
}


Page({
  data: {
    pageNumber: 1,
  },

  //开始页面
  onLoad() {
    //set channel bar
    let channelTitle = []
    for (let x in channelTitleMap) {
      channelTitle.push(channelTitleMap[x])
    }
    this.setData({
      channelTitle: channelTitle
    })
    //get gn news
    this.setFirstPage()
  },


  //上拉触底加入新新闻
  onReachBottom() {
    let page = this.data.pageNumber + 1
    if (page <= this.data.totalPage) {
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://route.showapi.com/109-35',
        data: {
          "showapi_appid": '92969', //这里需要改成自己的appid
          "showapi_sign": 'eedcb02a3323485a84c33b72074df757', //这里需要改成自己的应用的密钥secret
          "channelId": channelIdMap.gn,
          "page": page,
          "needAllList": "0",
          "maxResult": 10,
          "id": ""
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          let newsData = res.data.showapi_res_body.pagebean.contentlist
          this.data.newsList = this.data.newsList.concat(newsData)
          this.setData({
           newsList: this.data.newsList,
            pageNumber: page,
          })
          wx.hideLoading()
        },
        fail:res =>{
          wx.hideLoading()
        }
      }, )
    }
  },

//下拉刷新
onPullDownRefresh(){
this.setFirstPage()
wx.stopPullDownRefresh()
console.log('refreshed')
},


  //API接入
  setFirstPage() {
    wx.request({
      url: 'https://route.showapi.com/109-35',
      data: {
        "showapi_appid": '92969', //这里需要改成自己的appid
        "showapi_sign": 'eedcb02a3323485a84c33b72074df757', //这里需要改成自己的应用的密钥secret
        "channelId": channelIdMap.gn,
        "page": 1,
        "needAllList": "0",
        "maxResult": 10,
        "id": ""
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let newsData = res.data.showapi_res_body.pagebean.contentlist
        let imgNews = []
        let listNews = []
        for (let i = 0; i < 10; i++) {
          let oneNews = newsData[i]
          if (oneNews.havePic && imgNews.length < 4) {
            imgNews.push(oneNews)
          } else {
            listNews.push(oneNews)
          }
        }
        this.setData({
          focusedNews: imgNews,
          newsList: listNews,
          totalPage: res.data.showapi_res_body.pagebean.allPages
        })
      },
    })
  },

  //点击时，跳转到相关新闻
  onTap: (event) => {
    let newsId = event.currentTarget.dataset.id
    console.log(newsId)
    wx.navigateTo({
      url: '../content/content?id='+newsId,
    })
    
  }
})