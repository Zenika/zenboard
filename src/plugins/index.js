import { List } from 'immutable'

import ZenikaLogo from './ZenikaLogo/ZenikaLogo'
import BoardInfo from './BoardInfo/BoardInfo'
import PhotoDisplay from './PhotoDisplay/PhotoDisplay'
import OpenWeather from './OpenWeather/OpenWeather'

const plugins = new List([
  {
    name: 'ZenikaLogo',
    component: ZenikaLogo,
  },
  {
    name: 'OpenWeather',
    component: OpenWeather,
  },
  {
    name: 'photos',
    component: PhotoDisplay,
  },
  {
    name: 'BoardInfo',
    component: BoardInfo,
  },
])

export default plugins
