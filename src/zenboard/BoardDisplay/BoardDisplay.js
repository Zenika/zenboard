import {connect} from 'react-redux';

import {nextDisplay} from 'redux/actions'
import BoardDisplay from './BoardDisplay.jsx'

const mapStateToProps = (state) => {
  return {
    interval: state.board.interval,
    display: state.board.display
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    nextDisplay: () => dispatch(nextDisplay())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(BoardDisplay);
