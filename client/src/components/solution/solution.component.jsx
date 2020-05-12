import React from 'react';
import './solution.styles.scss';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/scss/github.scss';
import javascript from 'highlight.js/lib/languages/javascript';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleSearchField } from '../../redux/universal/universal.action';
import {
  setCurrentModule,
  postQuestion,
  deletionStart,
  setQuestionDataAsync,
} from '../../redux/question/question.action';

import {
  selectCurrentModule,
  selectQuestionData,
  selectPendingData,
} from '../../redux/question/question.selector';
import { clearStorage } from '../nav/nav.util';
import {
  TitleSection,
  DescriptionSection,
  ExplanationSection,
  SolutionSection,
} from '../sections/sections.component';

class Solution extends React.Component {
  componentDidMount() {
    hljs.registerLanguage('javascript', javascript);
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
    opts.brace_style = 'collapse';
    opts.jslint_happy = true;
    // opts.wrap_line_length = 200;
    return opts;
  }
  afterSuccessCallback = (value) => {
    const {
      currentModule,
      history: { push },
    } = this.props;
    clearStorage();
    if (currentModule === 'pendingQuestions') {
      if (value === 'postedAndDeleted') {
        this.props.setQuestionDataAsync();
      }
      push('/');
    } else {
      push('/thanks');
    }
    currentModule === 'pendingQuestions' ? push('/') : push('/thanks');
  };

  handleSubmit = async () => {
    let finalData = JSON.parse(localStorage.getItem('finalData'));
    finalData.collectionName =
      this.props.currentModule === 'pendingQuestions'
        ? 'questions'
        : 'pendingQuestions';

    const objData = {
      afterSuccessCallback: this.afterSuccessCallback,
      finalData,
    };
    this.props.postQuestion(objData);
  };

  handleDelete = () => {
    const objData = {
      afterSuccessCallback: this.afterSuccessCallback,
      id: JSON.parse(localStorage.getItem('id')),
    };
    this.props.deletionStart(objData);
  };

  render() {
    const { currentModule, pending_data, question_data } = this.props;
    let finalData = {};
    let buttonEnabled = false;
    let renderThisPage = true;
    this.id = null;
    const previewModeActivated = this.props.match.path === '/preview';

    if (previewModeActivated) {
      finalData = JSON.parse(localStorage.getItem('finalData'));
      buttonEnabled = JSON.parse(localStorage.getItem('buttonEnabled'));
      renderThisPage = finalData && buttonEnabled;
    } else {
      this.id = this.props.match.params.id;
      finalData = !!this.id
        ? currentModule === 'questions'
          ? question_data[this.id]
          : pending_data[this.id]
        : {};
      localStorage.setItem('finalData', JSON.stringify(finalData));
      localStorage.setItem('id', JSON.stringify(this.id));
    }

    const userMode =
      this.props.currentModule !== 'pendingQuestions' && !this.id;
    return (
      <div className='solution'>
        {renderThisPage && Object.keys(finalData).length ? (
          <>
            {userMode ? (
              <div className='previewBtn'>
                <CustomButton
                  onClick={() => this.props.history.push(`/upload`)}
                >
                  Back to editor
                </CustomButton>
                <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
              </div>
            ) : null}

            {this.props.currentModule === 'pendingQuestions' ? (
              <div className='previewBtn'>
                <CustomButton onClick={this.handleDelete}>Delete</CustomButton>

                <CustomButton
                  onClick={() => this.props.history.push(`/upload`)}
                >
                  Back to editor
                </CustomButton>
                <CustomButton onClick={this.handleSubmit}>Submit</CustomButton>
              </div>
            ) : null}
            <TitleSection title={finalData.title} />
            <DescriptionSection description={finalData.description} />
            <SolutionSection solution={finalData.solution} />
            <ExplanationSection explanation={finalData.explanation} />
          </>
        ) : (
          this.props.history.push('/404')
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  question_data: selectQuestionData(state),
  pending_data: selectPendingData(state),
  currentModule: selectCurrentModule(state),
});
const mapDispatchToProps = (dispatch) => ({
  toggleSearchField: () => dispatch(toggleSearchField()),
  setCurrentModule: (data) => dispatch(setCurrentModule(data)),
  postQuestion: (data) => dispatch(postQuestion(data)),
  deletionStart: (data) => dispatch(deletionStart(data)),
  setQuestionDataAsync: () => dispatch(setQuestionDataAsync()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Solution),
);
