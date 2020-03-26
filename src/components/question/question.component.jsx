import React from 'react'
import './question.styles.scss'
import { Link } from 'react-router-dom'
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
class Question extends React.Component {
  render() {
    const {
      id,
      question: { title },
    } = this.props

    return (
      <div className='question'>
        <Link className='question_link' to={`/solution/${id}`}>
          <Editor toolbarHidden editorState={someFunc(title)} readOnly />
        </Link>
      </div>
    )
  }
}

export default Question
