import React from "react";
import "./question-container.styles.scss";
import Question from "../question/question.component";
import { connect } from "react-redux";
import { selectQuestionData } from "../../redux/question/question.selector";

const QuestionContainer = ({ question_data }) => {
    return (
        <div className="questionContainer">
            {question_data.map(question => (
                <Question key={question.id} question={question} />
            ))}
        </div>
    );
};
const mapStateToProps = state => ({
    question_data: selectQuestionData(state)
});
export default connect(mapStateToProps)(QuestionContainer);
