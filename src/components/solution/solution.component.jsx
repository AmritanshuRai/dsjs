import React from 'react';
import Highlight from "react-highlight.js";
import {connect} from 'react-redux'
import {toggleSearchField} from '../../redux/question/question.action'
import QUESTION_DATA from '../question-container/question-container.data';


class Solution extends React.Component {
    componentDidMount(){
        this.props.toggleSearchField();

    }
    componentWillUnmount(){
        this.props.toggleSearchField();
    }
    render(){
        const id = this.props.match.params.id;
        return (
            <Highlight>
                {QUESTION_DATA[id-1].solution}
            </Highlight>
        )
    }
}
const mapStateToProps = (state) => ({
    // toggleSearchField : state.question.toggleSearchField
});
const mapDispatchToProps = dispatch => ({
    toggleSearchField : () => dispatch(toggleSearchField())
})
export default connect(mapStateToProps,mapDispatchToProps)(Solution);
