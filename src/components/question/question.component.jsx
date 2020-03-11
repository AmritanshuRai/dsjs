import React from "react";
import "./question.styles.scss";
import { Link } from "react-router-dom";

const Question = ({ question: { question, id } }) => {
    return (
        <div className="question">
            <Link className="question_link" to={`/solution/${id}`}>
                {question}
            </Link>
        </div>
    );
};

export default Question;
