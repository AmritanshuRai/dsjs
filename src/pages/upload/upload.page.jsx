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
import { createQuestion } from '../../firebase/firebase.utils';
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

class MyEditor extends Component {
  constructor(props) {
    super(props);

    const titleStateRaw = localStorage.getItem('titleStateRaw');
    const solutionStateRaw = localStorage.getItem('solutionStateRaw');
    const explanationStateRaw = localStorage.getItem('explanationStateRaw');

    if (titleStateRaw || solutionStateRaw || explanationStateRaw) {
      const rawContentTitleState = convertFromRaw(JSON.parse(titleStateRaw));
      const rawContentSolutionState = convertFromRaw(
        JSON.parse(solutionStateRaw),
      );
      const rawContentExplanationState = convertFromRaw(
        JSON.parse(explanationStateRaw),
      );

      this.props.setTitleState(
        EditorState.createWithContent(rawContentTitleState),
      );
      this.props.setSolutionState(
        EditorState.createWithContent(rawContentSolutionState),
      );
      this.props.setExplanationState(
        EditorState.createWithContent(rawContentExplanationState),
      );
    } else {
      this.props.setTitleState(EditorState.createEmpty());
      this.props.setSolutionState(EditorState.createEmpty());
      this.props.setExplanationState(EditorState.createEmpty());
    }
  }

  saveEditorData = stateStr => {
    let stateVar = this.props[stateStr];
    let rawstate = convertToRaw(stateVar.getCurrentContent());

    localStorage.setItem(stateStr + 'Raw', JSON.stringify(rawstate));
  };

  removeEditorData = () => {
    localStorage.removeItem('titleStateRaw');
    localStorage.removeItem('solutionStateRaw');
    localStorage.removeItem('explanationStateRaw');
  };

  handleSubmit = async () => {
    const { titleState, solutionState, explanationState } = this.props;

    const dataObj = {
      title: titleState.getCurrentContent().getPlainText(),
      solution: solutionState.getCurrentContent().getPlainText(),
      explanation: draftToHtml(
        convertToRaw(explanationState.getCurrentContent()),
      ),
    };
    try {
      await createQuestion(dataObj);
      this.removeEditorData();
      this.props.history.push(`/`);
    } catch (error) {
      console.log('lauda lag gaya');
    }
  };

  render() {
    const { titleState, solutionState, explanationState } = this.props;

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
        <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
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
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyEditor),
);
