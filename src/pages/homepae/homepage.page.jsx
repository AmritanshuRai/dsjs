import React from 'react';
import QuestionContainer from '../../components/question-container/question-container.component';

const HomePage = (props) => {
    return(
        <div className='homepage'>
            <QuestionContainer {...props}/>
        </div>
    )
}
     

export default HomePage;