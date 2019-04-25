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
    channelIndex: 0,
  },

  //开始页面
  onLoad() {
    //set channel bar
    let channelTitle = []
    let clickedChannel = {}
    for (let x in channelIdMap) {
      channelTitle.push({
        "city": x,
        "style": 'none'
      })
    }
    this.setData({
      channelTitle: channelTitle,
    })
    console.log(this.data.defalutStyle)
    //get gn news
    this.setFirstPage()
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
    this.setData({
      channel: event.currentTarget.dataset.name,
      channelIndex: event.currentTarget.dataset.id
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
        this.setNews(res)
        this.showClickedChannel()
      },
    })
  },

  //设置新闻
  setNews(res) {
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
    if (!imgNews) { //如果前十条里没有带图新闻
      console.log(imgNews)
      imgNews = this.data.focusedNews
    }
    this.setData({
      focusedNews: imgNews,
      newsList: listNews,
      totalPage: res.data.showapi_res_body.pagebean.allPages,
      pageNumber: 1,
    })
  },

  //indicate which channel I choose
  showClickedChannel() {
    this.data.channelTitle.forEach(function(value) {
      value.style = 'none'
    })
    this.data.channelTitle[this.data.channelIndex].style = "border-bottom: 4px solid maroon"
    this.setData({
      channelTitle: this.data.channelTitle
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

  //当imge 403
  errImg(e) {
    console.log(e)
    let index = e.currentTarget.dataset.errimg
    this.data.newsList[index].img = '../../images/defaultImg.jpg'
    this.setData({
      newsList: this.data.newsList
    })
  }
})