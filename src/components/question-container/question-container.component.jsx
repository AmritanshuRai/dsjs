import React from 'react';

import Question from '../question/question.component';
import QUESTION_DATA from './question-container.data';

// const QuestionContainer = () => (
//     <div className='questionContainer'>

//     </div>
// );

class QuestionContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            questions : QUESTION_DATA
        }
    }

    render(){
       const { questions } = this.state;
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
} 

export default QuestionContainer;



