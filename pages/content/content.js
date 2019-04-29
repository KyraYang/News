// pages/centent/content.js
Page({

  /**
   * Page initial data
   */
  data: {},

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    let newsId = options.id
    wx.request({
      url: 'https://route.showapi.com/109-35',
      data: {
        "showapi_appid": '92969', //这里需要改成自己的appid
        "showapi_sign": 'eedcb02a3323485a84c33b72074df757', //这里需要改成自己的应用的密钥secret
        "needAllList": 1,
        "id": newsId
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let newsContent = res.data.showapi_res_body.pagebean.contentlist[0]
        let content = newsContent.allList
        for(let i = 0;i <content.length; i++){
          if (content[i].url){
            if ((content[i].url).indexOf('thumbnail') !== -1 || (content[i].url).indexOf('end_news') !== -1){   
              content[i] = ''
            }
          }
        }
        this.setData({
          content: content,
          pubDate: newsContent.pubDate,
          title: newsContent.title,
          source: newsContent.source
        })
      },
    })
  },
  //当imge 403
  errImg(e) {
    console.log(e)
    let index = e.currentTarget.dataset.errimg
    this.data.content[index] = {url:'../../images/defaultImg.jpg'}
    this.setData({
      content: this.data.content
    })
  }

})