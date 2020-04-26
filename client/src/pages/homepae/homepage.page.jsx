import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QuestionContainer from '../../components/question-container/question-container.component';
import { selectSkeletonLoading } from '../../redux/question/question.selector';
import HomepageSkeleton from './homepage.skeleton';
import {
  setCurrentModule,
  setQuestionDataAsync,
} from '../../redux/question/question.action';
class HomePage extends React.PureComponent {
  componentDidMount() {
    // console.warn(this.props);
    this.props.setCurrentModule('questions');
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
        {this.props.skeletonLoading ? (
          <HomepageSkeleton totalItems={18} />
        ) : (
          <QuestionContainer />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  skeletonLoading: selectSkeletonLoading(state),
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentModule: (data) => dispatch(setCurrentModule(data)),
  setQuestionDataAsync: () => dispatch(setQuestionDataAsync()),
});
const ConnectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

HomePage.whyDidYouRender = true;

export default withRouter(ConnectedHomePage);
