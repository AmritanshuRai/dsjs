import React from 'react';
import './question-container.styles.scss';
import Question from '../question/question.component';
import { connect } from 'react-redux';
import {
  selectQuestionData,
  selectCurrentModule,
  selectPendingData,
} from '../../redux/question/question.selector';
import { Row } from 'antd';

class QuestionContainer extends React.Component {
  render() {
    let dataObj =
      this.props.currentModule === 'questions'
        ? 'question_data'
        : 'pending_data';
    return (
      <Row
        gutter={[
          { md: 32, lg: 48 },
          { xs: 24, sm: 24, md: 32, lg: 48 },
        ]}
      >
        {Object.keys(this.props[dataObj]).map((key, index) => (
          <Question key={key} id={key} question={this.props[dataObj][key]} />
        ))}
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  question_data: selectQuestionData(state),
  pending_data: selectPendingData(state),
  currentModule: selectCurrentModule(state),
});
export default connect(mapStateToProps)(QuestionContainer);
