import React from 'react';
import './approve.styles.scss';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import QuestionContainer from '../../components/question-container/question-container.component';

import { toggleLoader } from '../../redux/universal/universal.action';
import {
  setCurrentModule,
  setQuestionDataAsync,
} from '../../redux/question/question.action';
import HomepageSkeleton from '../homepae/homepage.skeleton';
import {
  selectCurrentModule,
  selectSkeletonLoading,
} from '../../redux/question/question.selector';
class Approve extends React.Component {
  componentDidMount() {
    const { setCurrentModule, history, setQuestionDataAsync } = this.props;
    setCurrentModule('pendingQuestions');
    setQuestionDataAsync(history);
  }

  render() {
    return (
      <div className='homepage approve'>
        <div className='approveHeading'>Verification Mode</div>
        {this.props.skeletonLoading ? (
          <HomepageSkeleton totalItems={15} />
        ) : (
          <QuestionContainer />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentModule: selectCurrentModule(state),
  skeletonLoading: selectSkeletonLoading(state),
});
const mapDispatchToProps = (dispatch) => ({
  toggleLoader: (data) => dispatch(toggleLoader(data)),
  setCurrentModule: (data) => dispatch(setCurrentModule(data)),
  setQuestionDataAsync: (history) => dispatch(setQuestionDataAsync(history)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Approve),
);
