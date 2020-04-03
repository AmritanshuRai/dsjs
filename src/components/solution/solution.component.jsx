import React from 'react';
import { selectEveryQuestion } from '../../redux/question/question.selector';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/scss/github.scss';
import javascript from 'highlight.js/lib/languages/javascript';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { toggleSearchField } from '../../redux/universal/universal.action';
// import jsbeautifier from 'js-beautify/js';
import beautify from 'js-beautify/js';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
const toEditorState = htmlStr => {
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
    opts.wrap_line_length = 100;
    return opts;
  }

  render() {
    let finalData = {};
    let buttonEnabled = false;
    let renderThisPage = true;

    const previewModeActivated = this.props.match.path === '/preview';

    if (previewModeActivated) {
      finalData = JSON.parse(localStorage.getItem('finalData'));
      buttonEnabled = JSON.parse(localStorage.getItem('buttonEnabled'));
      renderThisPage = finalData && buttonEnabled;
    } else {
      const id = this.props.match.params.id;
      finalData = this.props.EVERY_QUESTION[id];
    }

    return (
      <div>
        {renderThisPage && Object.keys(finalData).length ? (
          <div>
            <div>TITLE</div>
            <Editor
              toolbarHidden
              editorState={toEditorState(finalData.title)}
              readOnly
            />
            <div>SOLUTION</div>
            <pre>
              <code>{beautify(finalData.solution, this.beautifyConfig())}</code>
            </pre>
            <div>EXPLAIN THIS SHIT</div>
            <Editor
              toolbarHidden
              editorState={toEditorState(finalData.explanation)}
              readOnly
            />
          </div>
        ) : (
          this.props.history.push('/404')
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  EVERY_QUESTION: selectEveryQuestion(state),
});
const mapDispatchToProps = dispatch => ({
  toggleSearchField: () => dispatch(toggleSearchField()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Solution),
);
