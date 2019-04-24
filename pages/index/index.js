const channelIdMap = {
  //焦点新闻, 
  '国内': "5572a108b3cdc86cf39001cd",
  '国际': "5572a108b3cdc86cf39001ce",
  '财经': "5572a108b3cdc86cf39001d0",
  '互联网': "5572a108b3cdc86cf39001d1",
  '体育': "5572a108b3cdc86cf39001d4",
  '科技': "5572a108b3cdc86cf39001d9",
  '社会': "5572a109b3cdc86cf39001da",
  '娱乐': "5572a108b3cdc86cf39001d5",
  '军事': "5572a108b3cdc86cf39001cf",
}


Page({
  data: {
    pageNumber: 1,
    channel: '国内',
  },

  //开始页面
  onLoad() {
    //set channel bar
    let channelTitle = []
    for (let x in channelIdMap) {
      channelTitle.push(x)
    }
    this.setData({
      channelTitle: channelTitle
    })
    //get gn news
    this.setFirstPage()
    console.log(this)
  },


  //上拉触底加入新新闻
  onReachBottom() {
    let page = this.data.pageNumber + 1
    let channel = this.data.channel
    if (page <= this.data.totalPage) {
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://route.showapi.com/109-35',
        data: {
          "showapi_appid": '92969', //这里需要改成自己的appid
          "showapi_sign": 'eedcb02a3323485a84c33b72074df757', //这里需要改成自己的应用的密钥secret
          "channelId": channelIdMap[channel],
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
        fail: res => {
          wx.hideLoading()
        }
      }, )
    }
  },

  //下拉刷新
  onPullDownRefresh() {
    this.setFirstPage()
    wx.stopPullDownRefresh()
    console.log('refreshed')
  },


  //API接入
  setFirstPage() {
    let channel = this.data.channel
    wx.request({
      url: 'https://route.showapi.com/109-35',
      data: {
        "showapi_appid": '92969', //这里需要改成自己的appid
        "showapi_sign": 'eedcb02a3323485a84c33b72074df757', //这里需要改成自己的应用的密钥secret
        "channelId": channelIdMap[channel],
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
      url: '../content/content?id=' + newsId,
    })
  },

  //点击转换channel
  onTapChannel: (event) => {
    let selectChannel = event.currentTarget.dataset.name
    console.log(this)
   
  }
})