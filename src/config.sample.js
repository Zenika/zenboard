const CONFIG = {
  interval: 10000,
  displays: {
    topRight: {
      plugin: 'ZenikaLogo'
    },
    topLeft: {
      plugin: 'ZenikaLogo'
    },
    bottomLeft: {
      plugin: 'BoardInfo'
    },
    bottomRight: {},
    content : [
      {
        plugin: 'BoardInfo'
      },
      {
        plugin: 'ZenikaLogo'
      }
    ]
  }
}

export default CONFIG;
