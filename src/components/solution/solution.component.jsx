import React from "react";

import hljs from "highlight.js/lib/highlight";
import "highlight.js/styles/github.css";
import javascript from "highlight.js/lib/languages/javascript";

import { connect } from "react-redux";
import { toggleSearchField } from "../../redux/question/question.action";
import QUESTION_DATA from "../../redux/question/question.data";
// import jsbeautifier from 'js-beautify/js';
import beautify from "js-beautify/js";

class Solution extends React.Component {
    componentDidMount() {
        hljs.registerLanguage("javascript", javascript);
        hljs.initHighlighting.called = false;
        hljs.initHighlighting();
        this.props.toggleSearchField();
    }
    componentWillUnmount() {
        this.props.toggleSearchField();
    }
    beautifyConfig() {
        let opts = {};
        opts.preserve_newlines = false;
        opts.space_in_empty_paren = true;
        opts.brace_style = "collapse";
        opts.jslint_happy = true;
        opts.wrap_line_length = 100;
        return opts;
    }

    render() {
        const id = this.props.match.params.id;
        return (
            <pre>
                <code>
                    {beautify(
                        QUESTION_DATA[id - 1].solution,
                        this.beautifyConfig()
                    )}
                </code>
            </pre>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggleSearchField: () => dispatch(toggleSearchField())
});
export default connect(null, mapDispatchToProps)(Solution);
