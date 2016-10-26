const CONFIG = {
  interval: 10000,
  displays: {
    topRight: {
      plugin: 'ZenikaLogo',
    },
    topLeft: {
      plugin: 'ZenikaLogo',
    },
    bottomLeft: {
      plugin: 'BoardInfo',
    },
    bottomRight: {},
    footer: {
      plugin: 'AgencyNews',
      props: {
        apiKey: '',
        sheetId: '',
      },
    },
    content: [
      {
        plugin: 'BoardInfo',
      },
      {
        plugin: 'ZenikaLogo',
      },
    ],
  },
}

export default CONFIG
