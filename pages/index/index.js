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
  //[0]focused, 
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
    focusedNews: {
      'gn': [],
      'gj': [],
      'cj': [],
      'hlw': [],
      'ty': [],
      'kj': [],
      'sh': [],
      'yl': [],
      'js': []},
    newsList: {
      'gn': [],
      'gj': [],
      'cj': [],
      'hlw': [],
      'ty': [],
      'kj': [],
      'sh': [],
      'yl': [],
      'js': []
    },
  },
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
   this.getNewsContent('gn')
  },

  //API接入
  getNewsContent(channelId){
    wx.request({
      url: 'https://route.showapi.com/109-35',
      data: {
        "showapi_appid": '92969', //这里需要改成自己的appid
        "showapi_sign": 'eedcb02a3323485a84c33b72074df757', //这里需要改成自己的应用的密钥secret
        "channelId": channelIdMap[channelId],
        "page": "1",
        "needAllList": "0",
        "maxResult": "10",
        "id": ""
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let newsData = res.data.showapi_res_body.pagebean.contentlist
        console.log(newsData)
        let imgNews = []
        let listNews = []
        for (let i=0; i<10; i++){
          let oneNews = newsData[i]
          console.log(oneNews)
          if (oneNews.havePic && imgNews.length<4){
            imgNews.push(oneNews)
          }else{
            listNews.push(oneNews)
          }
        }
        this.data.focusedNews[channelId] = imgNews
        this.data.newsList[channelId] = listNews
        this.setData({
          focusedNews: this.data.focusedNews,
          newsList: this.data.newsList,
        })
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