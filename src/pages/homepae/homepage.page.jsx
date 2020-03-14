import React from "react";
import QuestionContainer from "../../components/question-container/question-container.component";

class HomePage extends React.Component {
    render() {
        return (
            <div className="homepage">
                <QuestionContainer />
            </div>
        );
    }
}

export default HomePage;
