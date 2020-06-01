import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import QuestionContainer from '../../components/question-container/question-container.component';
import {
  selectSkeletonLoading,
  selectTotalQueryCount,
  selectCurrentPage,
} from '../../redux/question/question.selector';
import HomepageSkeleton from './homepage.skeleton';
import {
  setCurrentModule,
  setQuestionDataAsync,
  setCurrentPage,
} from '../../redux/question/question.action';

import { Pagination } from 'antd';
// import { Offline, Online } from 'react-detect-offline';
class HomePage extends React.PureComponent {
  componentDidMount() {
    this.props.setCurrentModule('questions');
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
  paginationComponent = () => {
    return (
      <Pagination
        className='questionContainer-pagination'
        onChange={this.onPageChange}
        pageSize={20}
        defaultCurrent={1}
        current={this.props.selectCurrentPage}
        total={this.props.selectTotalQueryCount}
        showSizeChanger={false}
        showLessItems={true}
        showTotal={(total) => `Total ${total} questions`}
      />
    );
  };
  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.setQuestionDataAsync(`page=${pageNumber}`);
  };
  render() {
    return (
      <>
        <div className='homepage'>
          {this.props.skeletonLoading ? (
            <HomepageSkeleton totalItems={20} />
          ) : (
            <QuestionContainer />
          )}
        </div>
        {this.paginationComponent()}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  skeletonLoading: selectSkeletonLoading(state),
  selectTotalQueryCount: selectTotalQueryCount(state),
  selectCurrentPage: selectCurrentPage(state),
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentModule: (data) => dispatch(setCurrentModule(data)),
  setQuestionDataAsync: (query) => dispatch(setQuestionDataAsync(query)),
  setCurrentPage: (data) => dispatch(setCurrentPage(data)),
});

//match object is always newly created causing unnessary re-renders
// https://github.com/ReactTraining/react-router/issues/5099

// const mergeProps = (stateProps, dispatchProps) => {
//   const { match, ...filteredStateProps } = stateProps;
//   return Object.assign({}, filteredStateProps, dispatchProps);
// };
const ConnectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

HomePage.whyDidYouRender = true;

export default withRouter(ConnectedHomePage);
