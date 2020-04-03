import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  // ContentState,
  // convertFromHTML,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToMarkdown from 'draftjs-to-markdown'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import './upload.styles.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
// import { createQuestion } from '../../firebase/firebase.utils';
import {
  setTitleState,
  setSolutionState,
  setExplanationState,
} from '../../redux/editor/editor.action';
import {
  selectExplanationState,
  selectSolutionState,
  selectTitleState,
} from '../../redux/editor/editor.selector';
// import { toggleLoader } from '../../redux/universal/universal.action';

class MyEditor extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    const titleStateRaw = localStorage.getItem('rawTitleState');
    const solutionStateRaw = localStorage.getItem('rawSolutionState');
    const explanationStateRaw = localStorage.getItem('rawExplanationState');
    titleStateRaw
      ? this.initEditorData(titleStateRaw, 'TitleState')
      : this.props.setTitleState(EditorState.createEmpty());
    solutionStateRaw
      ? this.initEditorData(solutionStateRaw, 'SolutionState')
      : this.props.setSolutionState(EditorState.createEmpty());
    explanationStateRaw
      ? this.initEditorData(explanationStateRaw, 'ExplanationState')
      : this.props.setExplanationState(EditorState.createEmpty());
  }
  initEditorData = (rawData, stateStr) => {
    const rawContent = convertFromRaw(JSON.parse(rawData));

    this.props['set' + stateStr](EditorState.createWithContent(rawContent));
  };

  saveEditorData = stateStr => {
    let stateVar = this.props[stateStr];
    let rawstate = convertToRaw(stateVar.getCurrentContent());
    const toUpperCase = stateStr.charAt(0).toUpperCase() + stateStr.slice(1);
    localStorage.setItem('raw' + toUpperCase, JSON.stringify(rawstate));
    this.previewBtnState();
  };

  previewBtnState = () => {
    const { titleState, solutionState, explanationState } = this.props;

    const { generatePlainText } = this;
    this.buttonEnabled =
      !!generatePlainText(titleState) &&
      !!generatePlainText(solutionState) &&
      !!generatePlainText(explanationState);
    localStorage.setItem('buttonEnabled', this.buttonEnabled);
  };

  generatePlainText = editorState => {
    return editorState.getCurrentContent().getPlainText();
  };

  handlePreview = () => {
    if (!this.buttonEnabled) {
      return;
    }
    const { titleState, solutionState, explanationState } = this.props;

    const dataObj = {
      title: this.generatePlainText(titleState),
      solution: this.generatePlainText(solutionState),
      explanation: draftToHtml(
        convertToRaw(explanationState.getCurrentContent()),
      ),
    };

    localStorage.setItem('finalData', JSON.stringify(dataObj));
    this.props.history.push(`/preview`);
  };

  render() {
    const { titleState, solutionState, explanationState } = this.props;

    this.buttonEnabled = false;
    this.previewBtnState();
    return (
      <div className='myEditor'>
        <Editor
          editorState={titleState}
          toolbarOnFocus
          wrapperClassName='demo-wrapper defaultWrapper'
          placeholder='Enter title'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState => {
            this.props.setTitleState(editorState);
          }}
          onContentStateChange={() => this.saveEditorData('titleState')}
        />
        <div></div>

        <Editor
          editorState={solutionState}
          toolbarOnFocus
          placeholder='Enter your program/code only'
          wrapperClassName='demo-wrapper defaultWrapper'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState => {
            this.props.setSolutionState(editorState);
          }}
          onContentStateChange={() => this.saveEditorData('solutionState')}
        />

        <Editor
          editorState={explanationState}
          toolbarOnFocus
          placeholder='Please explain your code in detail'
          wrapperClassName='demo-wrapper defaultWrapper'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState => {
            this.props.setExplanationState(editorState);
          }}
          onContentStateChange={() => this.saveEditorData('explanationState')}
        />

        <CustomButton
          // className={`${this.buttonEnabled ? 'btnEnabled' : 'btnDisabled'`}'}
          inactive={!this.buttonEnabled}
          onClick={this.handlePreview}
        >
          Preview
        </CustomButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  titleState: selectTitleState(state),
  solutionState: selectSolutionState(state),
  explanationState: selectExplanationState(state),
});
const mapDispatchToProps = dispatch => ({
  setTitleState: data => dispatch(setTitleState(data)),
  setSolutionState: data => dispatch(setSolutionState(data)),
  setExplanationState: data => dispatch(setExplanationState(data)),

  // toggleLoader: () => dispatch(toggleLoader()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyEditor),
);
