import React from 'react';

import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/github.css';
import javascript from 'highlight.js/lib/languages/javascript';

import {connect} from 'react-redux'
import {toggleSearchField} from '../../redux/question/question.action'
import QUESTION_DATA from '../../redux/question/question.data';
import beautify from 'js-beautify/js';

class Solution extends React.Component {
    componentDidMount(){
        hljs.registerLanguage('javascript', javascript);
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        this.props.toggleSearchField();
    }
    componentWillUnmount(){
        this.props.toggleSearchField();
    }
    render(){
        const id = this.props.match.params.id;
        let res = beautify(QUESTION_DATA[id-1].solution);
        return (
                <pre>
                    <code>
                         {res}
                    </code>
                </pre>
     
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleSearchField : () => dispatch(toggleSearchField())
})
export default connect(null,mapDispatchToProps)(Solution);
