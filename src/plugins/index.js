import { List } from 'immutable'

import ZenikaLogo from './ZenikaLogo'
import BoardInfo from './BoardInfo'
import PhotoDisplay from './PhotoDisplay'
import OpenWeather from './OpenWeather'
import Tweets from './Tweets'
import Scores from './Scores/Scores'
import Beer from './Beer'
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
    name: 'Beer',
    component: Beer,
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
