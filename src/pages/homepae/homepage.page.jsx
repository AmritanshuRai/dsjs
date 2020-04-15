import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QuestionContainer from '../../components/question-container/question-container.component';
import {
  setCurrentModule,
  setQuestionDataAsync,
} from '../../redux/question/question.action';
class HomePage extends React.Component {
  componentDidMount() {
    const collectionName = 'questions';
    this.props.setCurrentModule(collectionName);
    this.props.setQuestionDataAsync();
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }
  handleKeyPress = (event) => {
    event.preventDefault();
    if (event.keyCode === 32 && !!event.shiftKey) {
      this.props.history.push('/approve');
    }
  };
  render() {
    return (
      <div className='homepage'>
        <QuestionContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentModule: (data) => dispatch(setCurrentModule(data)),
  setQuestionDataAsync: () => dispatch(setQuestionDataAsync()),
});
export default withRouter(connect(null, mapDispatchToProps)(HomePage));
