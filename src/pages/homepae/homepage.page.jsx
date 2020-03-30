import React from 'react';
import QuestionContainer from '../../components/question-container/question-container.component';
import { fetchData } from '../../utils/fetchData';
import { connect } from 'react-redux';
import { setQuestionData } from '../../redux/question/question.action';
import { withRouter } from 'react-router-dom';
import {
  toggleLoader,
  shouldFetchData,
} from '../../redux/universal/universal.action';
import { selectShouldFetchData } from '../../redux/universal/universal.selector';

class HomePage extends React.Component {
  async componentWillMount() {
    if (this.props.shouldFetch) {
      this.props.toggleLoader();
      let fetchedData = await fetchData();
      this.props.setQuestionData(fetchedData);
      this.props.toggleLoader();
      if (this.props.shouldFetch) {
        this.props.shouldFetchData(false);
      }
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

const mapStateToProps = state => ({
  shouldFetch: selectShouldFetchData(state),
});
const mapDispatchToProps = dispatch => ({
  toggleLoader: () => dispatch(toggleLoader()),
  shouldFetchData: data => dispatch(shouldFetchData(data)),
  setQuestionData: data => dispatch(setQuestionData(data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage),
);
