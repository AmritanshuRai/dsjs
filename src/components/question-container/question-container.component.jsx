import React from 'react';

import Question from '../question/question.component';
// import QUESTION_DATA from './question-container.data';

const QuestionContainer = (props) => {
       const questions  = props.props;
       return (
           <div className=''>
               { 
                   questions.map((question)=>(
                    <Question key={question.id} question={question}/>
                   ))
               }
           </div>
       )
} 

export default QuestionContainer;



