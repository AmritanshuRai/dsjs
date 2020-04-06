import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../utils/fetchData';
import { withRouter } from 'react-router-dom';
import QuestionContainer from '../../components/question-container/question-container.component';
import { setQuestionData } from '../../redux/question/question.action';
import { toggleLoader } from '../../redux/universal/universal.action';
import { setCurrentModule } from '../../redux/question/question.action';
class Approve extends React.Component {
  async componentDidMount() {
    this.props.toggleLoader(true);
    const collectionName = 'pendingQuestions';
    this.props.setCurrentModule(collectionName);
    try {
      const fetchedData = await fetchData(collectionName);
      this.props.setQuestionData(fetchedData);
    } catch (error) {
      this.props.history.push('/');
    } finally {
      this.props.toggleLoader(false);
    }
  }

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
export default withRouter(connect(null, mapDispatchToProps)(Approve));
