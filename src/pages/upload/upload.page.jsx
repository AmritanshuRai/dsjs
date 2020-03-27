import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  // EditorState,
  convertToRaw,
  // convertFromRaw,
  // ContentState,
  // convertFromHTML,
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
// import draftToMarkdown from 'draftjs-to-markdown'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs';
import './upload.styles.scss'
import CustomButton from '../../components/custom-button/custom-button.component'
import { createQuestion } from '../../firebase/firebase.utils'
import {
  setTitleState,
  setSolutionState,
  setExplanationState,
} from '../../redux/question/question.action'
import {
  selectExplanationState,
  selectSolutionState,
  selectTitleState,
} from '../../redux/question/question.selector'

// const someFunc = htmlStr => {
//   const sampleMarkup = htmlStr
//   const blocksFromHTML = convertFromHTML(sampleMarkup)
//   const state = ContentState.createFromBlockArray(
//     blocksFromHTML.contentBlocks,
//     blocksFromHTML.entityMap,
//   )

//   const editorState = EditorState.createWithContent(state)
//   return editorState
// }

class MyEditor extends Component {
  // state = {
  //   titleState: EditorState.createEmpty(),
  //   solutionState: EditorState.createEmpty(),
  //   explanationState: EditorState.createEmpty(),
  //   finalShow: '',
  // }

  handleSubmit = async () => {
    const { titleState, solutionState, explanationState } = this.props
    // let value = solutionState.getCurrentContent().getPlainText()
    // let value1 = convertFromRaw(value)
    const dataObj = {
      title: draftToHtml(convertToRaw(titleState.getCurrentContent())),
      solution: solutionState.getCurrentContent().getPlainText(),
      explanation: draftToHtml(
        convertToRaw(explanationState.getCurrentContent()),
      ),
    }
    try {
      await createQuestion(dataObj)
      this.props.history.push(`/`)
    } catch (error) {
      console.log('lauda lag gaya')
    }
  }

  // onEditorStateChange = (editorState, type) => {
  //   switch (type) {
  //     case 'title':
  //       this.setState({
  //         titleState: editorState,
  //       })
  //       break
  //     case 'solution':
  //       this.setState({
  //         solutionState: editorState,
  //       })
  //       break
  //     case 'explanation':
  //       this.setState({
  //         explanationState: editorState,
  //       })
  //       break
  //     default:
  //   }
  // }

  render() {
    const { titleState, solutionState, explanationState } = this.props
    return (
      <div className='myEditor'>
        <Editor
          editorState={titleState}
          toolbarOnFocus
          wrapperClassName='demo-wrapper defaultWrapper'
          placeholder='Enter title'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState =>
            this.props.setTitleState(editorState)
          }
        />
        <Editor
          editorState={solutionState}
          toolbarOnFocus
          placeholder='Enter your program/code only'
          wrapperClassName='demo-wrapper defaultWrapper'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState =>
            this.props.setSolutionState(editorState)
          }
        />
        <Editor
          editorState={explanationState}
          toolbarOnFocus
          placeholder='Please explain your code in detail'
          wrapperClassName='demo-wrapper defaultWrapper'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState =>
            this.props.setExplanationState(editorState)
          }
        />
        <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
        {/* <Editor toolbarHidden editorState={this.state.finalShow} readOnly /> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  titleState: selectTitleState(state),
  solutionState: selectSolutionState(state),
  explanationState: selectExplanationState(state),
})
const mapDispatchToProps = dispatch => ({
  setTitleState: data => dispatch(setTitleState(data)),
  setSolutionState: data => dispatch(setSolutionState(data)),
  setExplanationState: data => dispatch(setExplanationState(data)),
})
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyEditor),
)
