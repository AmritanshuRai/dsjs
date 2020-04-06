import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../utils/fetchData';
import { withRouter } from 'react-router-dom';
import QuestionContainer from '../../components/question-container/question-container.component';
import { setQuestionData } from '../../redux/question/question.action';
import { toggleLoader } from '../../redux/universal/universal.action';
import { setCurrentModule } from '../../redux/question/question.action';
class HomePage extends React.Component {
  async componentDidMount() {
    this.props.toggleLoader(true);
    const collectionName = 'questions';

    this.props.setCurrentModule(collectionName);
    const fetchedData = await fetchData(collectionName);
    this.props.setQuestionData(fetchedData);
    this.props.toggleLoader(false);
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }
  handleKeyPress = event => {
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

const mapDispatchToProps = dispatch => ({
  toggleLoader: data => dispatch(toggleLoader(data)),
  setCurrentModule: data => dispatch(setCurrentModule(data)),
  setQuestionData: data => dispatch(setQuestionData(data)),
});
export default withRouter(connect(null, mapDispatchToProps)(HomePage));
