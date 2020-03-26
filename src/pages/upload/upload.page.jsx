import React, { Component } from 'react'
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  // ContentState,
  // convertFromHTML,
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToMarkdown from 'draftjs-to-markdown'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs';
import './upload.styles.scss'
import CustomButton from '../../components/custom-button/custom-button.component'
import { createQuestion } from '../../firebase/firebase.utils'

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
  state = {
    titleState: EditorState.createEmpty(),
    solutionState: EditorState.createEmpty(),
    explanationState: EditorState.createEmpty(),
    finalShow: '',
  }

  handleSubmit = () => {
    const { titleState, solutionState, explanationState } = this.state
    let value = solutionState.getCurrentContent().getPlainText()
    // let value1 = convertFromRaw(value)
    const dataObj = {
      title: draftToHtml(convertToRaw(titleState.getCurrentContent())),
      solution: solutionState.getCurrentContent().getPlainText(),
      explanation: draftToHtml(
        convertToRaw(explanationState.getCurrentContent()),
      ),
    }

    createQuestion(dataObj)
  }

  onEditorStateChange = (editorState, type) => {
    switch (type) {
      case 'title':
        this.setState({
          titleState: editorState,
        })
        break
      case 'solution':
        this.setState({
          solutionState: editorState,
        })
        break
      case 'explanation':
        this.setState({
          explanationState: editorState,
        })
        break
      default:
    }
  }

  render() {
    const { titleState, solutionState, explanationState } = this.state
    return (
      <div className='myEditor'>
        <Editor
          editorState={titleState}
          toolbarOnFocus
          wrapperClassName='demo-wrapper defaultWrapper'
          placeholder='Enter title'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState =>
            this.onEditorStateChange(editorState, 'title')
          }
        />
        <Editor
          editorState={solutionState}
          toolbarOnFocus
          placeholder='Enter your program/code only'
          wrapperClassName='demo-wrapper defaultWrapper'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState =>
            this.onEditorStateChange(editorState, 'solution')
          }
        />
        <Editor
          editorState={explanationState}
          toolbarOnFocus
          placeholder='Please explain your code in detail'
          wrapperClassName='demo-wrapper defaultWrapper'
          editorClassName='demo-editor defaultEditor'
          onEditorStateChange={editorState =>
            this.onEditorStateChange(editorState, 'explanation')
          }
        />
        <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
        {/* <Editor toolbarHidden editorState={this.state.finalShow} readOnly /> */}
      </div>
    )
  }
}
export default MyEditor
