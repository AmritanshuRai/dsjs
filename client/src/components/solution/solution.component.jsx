import React from 'react';
import './solution.styles.scss';
import { selectEveryQuestion } from '../../redux/question/question.selector';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/scss/github.scss';
import javascript from 'highlight.js/lib/languages/javascript';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleSearchField } from '../../redux/universal/universal.action';
import {
  setCurrentModule,
  postQuestion,
  deletionStart,
} from '../../redux/question/question.action';
import { selectCurrentModule } from '../../redux/question/question.selector';
// import jsbeautifier from 'js-beautify/js';
import beautify from 'js-beautify/js';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { toggleLoader } from '../../redux/universal/universal.action';
// import { selectSolutionState } from '../../redux/editor/editor.selector';
const toEditorState = (htmlStr) => {
  const sampleMarkup = htmlStr;
  const blocksFromHTML = convertFromHTML(sampleMarkup);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );

  const editorState = EditorState.createWithContent(state);
  return editorState;
};
class Solution extends React.Component {
  componentDidMount() {
    hljs.registerLanguage('javascript', javascript);
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
    this.props.toggleSearchField();
  }
  componentWillUnmount() {
    this.props.toggleSearchField();
  }
  beautifyConfig() {
    let opts = {};
    opts.preserve_newlines = false;
    opts.space_in_empty_paren = true;
    opts.brace_style = 'collapse';
    opts.jslint_happy = true;
    // opts.wrap_line_length = 200;
    return opts;
  }
  afterSuccessCallback = () => {
    const {
      currentModule,
      history: { push },
    } = this.props;
    this.removeEditorData();
    currentModule === 'pendingQuestions' ? push('/') : push('/thanks');
  };
  removeEditorData = () => {
    localStorage.removeItem('rawTitleState');
    localStorage.removeItem('rawSolutionState');
    localStorage.removeItem('rawExplanationState');
    localStorage.removeItem('buttonEnabled');
    localStorage.removeItem('finalData');
    localStorage.removeItem('id');
  };

  handleSubmit = async () => {
    let finalData = JSON.parse(localStorage.getItem('finalData'));
    finalData.collectionName =
      this.props.currentModule === 'pendingQuestions'
        ? 'questions'
        : 'pendingQuestions';

    const objData = {
      afterSuccessCallback: this.afterSuccessCallback,
      finalData,
    };
    this.props.postQuestion(objData);
  };

  handleDelete = () => {
    const objData = {
      afterSuccessCallback: this.afterSuccessCallback,
      id: JSON.parse(localStorage.getItem('id')),
    };
    this.props.deletionStart(objData);
  };

  render() {
    let finalData = {};
    let buttonEnabled = false;
    let renderThisPage = true;
    this.id = null;
    const previewModeActivated = this.props.match.path === '/preview';

    if (previewModeActivated) {
      finalData = JSON.parse(localStorage.getItem('finalData'));
      buttonEnabled = JSON.parse(localStorage.getItem('buttonEnabled'));
      renderThisPage = finalData && buttonEnabled;
    } else {
      this.id = this.props.match.params.id;
      finalData = !!this.id ? this.props.EVERY_QUESTION[this.id] : {};
      localStorage.setItem('finalData', JSON.stringify(finalData));
      localStorage.setItem('id', JSON.stringify(this.id));
    }

    const userMode =
      this.props.currentModule !== 'pendingQuestions' && !this.id;
    return (
      <div className='solution'>
        {renderThisPage && Object.keys(finalData).length ? (
          <>
            {userMode ? (
              <div className='previewBtn'>
                <CustomButton
                  onClick={() => this.props.history.push(`/upload`)}
                >
                  Back to editor
                </CustomButton>
                <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
              </div>
            ) : null}

            {this.props.currentModule === 'pendingQuestions' ? (
              <div className='previewBtn'>
                <CustomButton onClick={this.handleDelete}>Delete</CustomButton>

                <CustomButton
                  onClick={() => this.props.history.push(`/upload`)}
                >
                  Back to editor
                </CustomButton>
                <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
              </div>
            ) : null}
            <div className='section'>
              <div className='heading'>TITLE</div>
              <Editor
                toolbarHidden
                editorState={toEditorState(finalData.title)}
                readOnly
              />
            </div>
            <div className='section'>
              <div className='heading'>SOLUTION</div>
              <pre>
                <code>
                  {beautify(finalData.solution, this.beautifyConfig())}
                </code>
              </pre>
            </div>
            <div className='section'>
              <div className='heading'>EXPLANATION</div>
              <Editor
                toolbarHidden
                editorState={toEditorState(finalData.explanation)}
                readOnly
              />
            </div>
          </>
        ) : (
          this.props.history.push('/404')
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  EVERY_QUESTION: selectEveryQuestion(state),
  currentModule: selectCurrentModule(state),
});
const mapDispatchToProps = (dispatch) => ({
  toggleSearchField: () => dispatch(toggleSearchField()),
  setCurrentModule: (data) => dispatch(setCurrentModule(data)),
  postQuestion: (data) => dispatch(postQuestion(data)),
  deletionStart: (data) => dispatch(deletionStart(data)),
  toggleLoader: (data) => dispatch(toggleLoader(data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Solution),
);
