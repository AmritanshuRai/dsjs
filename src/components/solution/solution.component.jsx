import React from 'react';
import Highlight from "react-highlight.js";
import QUESTION_DATA from '../question-container/question-container.data';

const Solution  = (props) => {
    const id = props.match.params.id;
    return (
        <Highlight>
            {QUESTION_DATA[id-1].solution}
        </Highlight>
    )
}

export default Solution;
