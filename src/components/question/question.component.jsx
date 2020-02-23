import React from 'react';
import { Link } from 'react-router-dom';

const Question = ({question : {question, id}}) => {
    return (
        <div>
            <Link to={`/solution/${id}`}>
                 {question}
            </Link>
        </div>
    )
}

export default Question;