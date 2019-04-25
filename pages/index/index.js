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
          for (let i = 0; i < 10; i++) {
            let oneNews = newsData[i]
            if (oneNews.havePic) {
              oneNews = this.organiseImg(oneNews)
            }
            this.data.newsList.push(oneNews)
          }
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

  //点击时，跳转到相关新闻
  onTap: (event) => {
    let newsId = event.currentTarget.dataset.id
    console.log(newsId)
    wx.navigateTo({
      url: '../content/content?id=' + newsId,
    })
  },

  //点击转换channel
  onTapChannel(event) {
    let tapChannel = event.currentTarget.dataset.name
    this.setData({
      channel: tapChannel
    })
    wx.pageScrollTo({
      scrollTop: 0,
    })
    this.setFirstPage()
  },

  //API接入，获取第一页信息
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
          if (oneNews.havePic && imgNews.length < 3) {
            if (!oneNews.img) {
              oneNews['img'] = oneNews.imageurls[0].url
            }
            if ((oneNews.img).indexOf('thumbnail') !== -1 || (oneNews.img).indexOf('end_news') !== -1) { //确保大图是新闻相关图片
              delete oneNews.img
              listNews.push(oneNews)
            } else {
              imgNews.push(oneNews)
              continue
            }
          } else {
            if (oneNews.havePic) { //确保图片是新闻相关图片
              oneNews = this.organiseImg(oneNews)
            }
          }
          listNews.push(oneNews)
        }
        if(!imgNews){
          imgNews = this.data.focusedNews
        }
        this.setData({
          focusedNews: imgNews,
          newsList: listNews,
          totalPage: res.data.showapi_res_body.pagebean.allPages,
          pageNumber: 1
        })
      },
    })
  },



  //保证图片与新闻相关
  organiseImg(oneNews) {
    if (!oneNews.img) {
      oneNews['img'] = oneNews.imageurls[0].url
    }
    if ((oneNews.img).indexOf('thumbnail') !== -1 || (oneNews.img).indexOf('end_news') !== -1) {
      delete oneNews.img
    }
    return oneNews
  },
})