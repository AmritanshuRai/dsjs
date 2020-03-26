import React from 'react'
import { selectEveryQuestion } from '../../redux/question/question.selector'
import hljs from 'highlight.js/lib/highlight'
import 'highlight.js/scss/github.scss'
import javascript from 'highlight.js/lib/languages/javascript'

import { connect } from 'react-redux'
import { toggleSearchField } from '../../redux/universal/universal.action'
// import jsbeautifier from 'js-beautify/js';
import beautify from 'js-beautify/js'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
const someFunc = htmlStr => {
  const sampleMarkup = htmlStr
  const blocksFromHTML = convertFromHTML(sampleMarkup)
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  )

  const editorState = EditorState.createWithContent(state)
  return editorState
}
class Solution extends React.Component {
  componentDidMount() {
    hljs.registerLanguage('javascript', javascript)
    hljs.initHighlighting.called = false
    hljs.initHighlighting()
    this.props.toggleSearchField()
  }
  componentWillUnmount() {
    this.props.toggleSearchField()
  }
  beautifyConfig() {
    let opts = {}
    opts.preserve_newlines = false
    opts.space_in_empty_paren = true
    opts.brace_style = 'collapse'
    opts.jslint_happy = true
    opts.wrap_line_length = 100
    return opts
  }

  render() {
    const id = this.props.match.params.id
    // let value = beautify(
    //   this.props.EVERY_QUESTION[id].solution,
    //   this.beautifyConfig(),
    // )
    // if (this.props.EVERY_QUESTION.length === 0) return <></>;
    //highlight not working on page reload

    return (
      <div>
        {this.props.EVERY_QUESTION.length !== 0 ? (
          <div>
            <pre>
              <code>
                {/* <Editor
                toolbarHidden
                editorState={someFunc(this.props.EVERY_QUESTION[id].solution)}
                readOnly
              /> */}
                {beautify(
                  this.props.EVERY_QUESTION[id].solution,
                  this.beautifyConfig(),
                )}
              </code>
            </pre>
            <Editor
              toolbarHidden
              editorState={someFunc(this.props.EVERY_QUESTION[id].explanation)}
              readOnly
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  EVERY_QUESTION: selectEveryQuestion(state),
})
const mapDispatchToProps = dispatch => ({
  toggleSearchField: () => dispatch(toggleSearchField()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Solution)
