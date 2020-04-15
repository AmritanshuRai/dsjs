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
class Approve extends React.Component {
  async componentDidMount() {
    this.props.setCurrentModule('pendingQuestions');
    const success = await this.props.setQuestionDataAsync();
    if (!success) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className='homepage approve'>
        <div className='approveHeading'>Verification Mode</div>
        <QuestionContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleLoader: (data) => dispatch(toggleLoader(data)),
  setCurrentModule: (data) => dispatch(setCurrentModule(data)),
  setQuestionDataAsync: () => dispatch(setQuestionDataAsync()),
});
export default withRouter(connect(null, mapDispatchToProps)(Approve));
