import {connect} from 'react-redux';

import BoardCorner from './BoardCorner.jsx'

const mapStateToProps = (state, props) => {
  return {
    display: state.board[props.position]
  };
}


export default connect(mapStateToProps)(BoardCorner)
