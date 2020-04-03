import React, { Component } from 'react';
import './preview.styles.scss';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button.component';
import { createQuestion } from '../../firebase/firebase.utils';
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
  removeEditorData = () => {
    localStorage.removeItem('rawTitleState');
    localStorage.removeItem('rawSolutionState');
    localStorage.removeItem('rawExplanationState');
    localStorage.removeItem('finalData');
  };

  handleSubmit = async () => {
    this.props.toggleLoader(true);
    const finalData = JSON.parse(localStorage.getItem('finalData'));

    try {
      await createQuestion(finalData);
      this.removeEditorData();
      this.props.history.push(`/`);
    } catch (error) {
      console.log('lauda lag gaya');
    } finally {
      this.props.toggleLoader(false);
    }
  };
  render() {
    return (
      <div className='preview'>
        <div className='previewBtn'>
          <CustomButton onClick={() => this.props.history.push(`/upload`)}>
            Back to editor
          </CustomButton>
          <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
        </div>
        <Solution />
      </div>
    );
  }
}

// const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  toggleLoader: data => dispatch(toggleLoader(data)),
});

export default withRouter(connect(null, mapDispatchToProps)(Preview));
