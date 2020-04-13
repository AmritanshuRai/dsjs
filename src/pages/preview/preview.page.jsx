import React, { Component } from 'react';
import './preview.styles.scss';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import CustomButton from '../../components/custom-button/custom-button.component';
// import { createData } from '../../firebase/firebase.utils';
import { selectCurrentModule } from '../../redux/question/question.selector';
// import {
//   setTitleState,
//   setSolutionState,
//   setExplanationState,
// } from '../../redux/editor/editor.action';
// import {
//   selectExplanationState,
//   selectSolutionState,
//   selectTitleState,
// } from '../../redux/editor/editor.selector';
import { toggleLoader } from '../../redux/universal/universal.action';

import Solution from '../../components/solution/solution.component';

class Preview extends Component {
  componentDidMount() {
    if (
      !localStorage.getItem('finalData') &&
      JSON.parse(localStorage.getItem('buttonEnabled'))
    ) {
      //code needed here to enter from /preview
    }
  }
  // removeEditorData = () => {
  //   localStorage.removeItem('rawTitleState');
  //   localStorage.removeItem('rawSolutionState');
  //   localStorage.removeItem('rawExplanationState');
  //   localStorage.removeItem('buttonEnabled');
  //   localStorage.removeItem('finalData');
  // };
  // componentWillUnmount() {
  //   if (this.props.currentModule === 'pendingQuestions') {
  //     this.removeEditorData();
  //   }
  // }

  render() {
    return (
      <div className='preview'>
        {/* <div className='previewBtn'>
          <CustomButton onClick={() => this.props.history.push(`/upload`)}>
            Back to editor
          </CustomButton>
          <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
        </div> */}
        <Solution />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentModule: selectCurrentModule(state),
});
const mapDispatchToProps = (dispatch) => ({
  toggleLoader: (data) => dispatch(toggleLoader(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Preview),
);
