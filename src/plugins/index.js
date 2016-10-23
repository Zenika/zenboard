import { List } from 'immutable'

import ZenikaLogo from './ZenikaLogo/ZenikaLogo'
import BoardInfo from './BoardInfo/BoardInfo'
import PhotoDisplay from './PhotoDisplay/PhotoDisplay'
import OpenWeather from './OpenWeather/OpenWeather'
import Tweets from './Tweets/Tweets'
import Scores from './Scores/Scores'
import AgencyNews from './AgencyNews/AgencyNews'
import ZTalks from './ZTalks/ZTalks'

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
  {
    name: 'Tweets',
    component: Tweets,
  },
  {
    name: 'Scores',
    component: Scores,
  },
  {
    name: 'AgencyNews',
    component: AgencyNews,
  },
  {
    name: 'ZTalks',
    component: ZTalks,
  },
])

export default plugins
