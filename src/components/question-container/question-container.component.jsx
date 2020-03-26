import React from 'react'
import './question-container.styles.scss'
import Question from '../question/question.component'
import { connect } from 'react-redux'
import { selectQuestionData } from '../../redux/question/question.selector'

class QuestionContainer extends React.Component {
  render() {
    return (
      <div className='questionContainer'>
        {Object.keys(this.props.question_data).map((key, index) => (
          <Question
            key={key}
            id={key}
            question={this.props.question_data[key]}
          />
        ))}
        {/* {this.props.question_data.map(question => (
                    <Question key={question.id} question={question} />
                ))} */}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  question_data: selectQuestionData(state),
})
export default connect(mapStateToProps)(QuestionContainer)
