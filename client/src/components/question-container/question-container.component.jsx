import React from 'react';
import './question-container.styles.scss';
import Question from '../question/question.component';
import { connect } from 'react-redux';
import { selectQuestionData } from '../../redux/question/question.selector';
import { Row } from 'antd';

class QuestionContainer extends React.Component {
  render() {
    return (
      <Row
        gutter={[
          { md: 32, lg: 48 },
          { xs: 16, sm: 24, md: 32, lg: 48 },
        ]}
      >
        {Object.keys(this.props.question_data).map((key, index) => (
          <Question
            key={key}
            id={key}
            question={this.props.question_data[key]}
          />
        ))}
      </Row>
    );
  }
}
const mapStateToProps = (state) => ({
  question_data: selectQuestionData(state),
});
export default connect(mapStateToProps)(QuestionContainer);
