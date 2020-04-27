import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import './upload.styles.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
import { selectCurrentModule } from '../../redux/question/question.selector';
import { Tabs, Button } from 'antd';

const { TabPane } = Tabs;

class MyEditor extends Component {
  state = {
    titleState: EditorState.createEmpty(),
    solutionState: EditorState.createEmpty(),
    explanationState: EditorState.createEmpty(),
    descriptionState: EditorState.createEmpty(),
  };
  operations = (<Button>Extra Action</Button>);

  toEditorState = (htmlStr) => {
    const sampleMarkup = htmlStr;
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    const editorState = EditorState.createWithContent(state);
    return editorState;
  };

  componentDidMount() {
    if (
      this.props.currentModule === 'pendingQuestions' &&
      localStorage.getItem('finalData')
    ) {
      const finalData = JSON.parse(localStorage.getItem('finalData'));
      localStorage.removeItem('rawTitleState');
      localStorage.removeItem('rawDescriptionState');
      localStorage.removeItem('rawSolutionState');
      localStorage.removeItem('rawExplanationState');
      this.setState({ titleState: this.toEditorState(finalData.title) });
      this.setState({
        descriptionState: this.toEditorState(finalData.description),
      });
      this.setState({ solutionState: this.toEditorState(finalData.solution) });
      this.setState({
        explanationState: this.toEditorState(finalData.explanation),
      });
    } else {
      this.convertFromRawEditorState();
    }
  }

  convertFromRawEditorState = () => {
    const titleStateRaw = localStorage.getItem('rawTitleState');
    const descriptionStateRaw = localStorage.getItem('rawDescriptionState');
    const solutionStateRaw = localStorage.getItem('rawSolutionState');
    const explanationStateRaw = localStorage.getItem('rawExplanationState');
    titleStateRaw
      ? this.initEditorData(titleStateRaw, 'titleState')
      : this.setState({ titleState: EditorState.createEmpty() });
    descriptionStateRaw
      ? this.initEditorData(descriptionStateRaw, 'descriptionState')
      : this.setState({ descriptionState: EditorState.createEmpty() });
    solutionStateRaw
      ? this.initEditorData(solutionStateRaw, 'solutionState')
      : this.setState({ solutionState: EditorState.createEmpty() });
    explanationStateRaw
      ? this.initEditorData(explanationStateRaw, 'explanationState')
      : this.setState({ explanationState: EditorState.createEmpty() });
  };

  initEditorData = (rawData, stateStr) => {
    const rawContent = convertFromRaw(JSON.parse(rawData));

    this.setState({ [stateStr]: EditorState.createWithContent(rawContent) });
  };

  saveEditorData = (stateStr) => {
    let stateVar = this.state[stateStr];

    let rawstate = convertToRaw(stateVar.getCurrentContent());
    const toUpperCase = stateStr.charAt(0).toUpperCase() + stateStr.slice(1);
    localStorage.setItem('raw' + toUpperCase, JSON.stringify(rawstate));
    this.previewBtnState();
  };

  previewBtnState = () => {
    const {
      titleState,
      solutionState,
      explanationState,
      descriptionState,
    } = this.state;

    const { generatePlainText } = this;
    this.buttonEnabled =
      !!generatePlainText(titleState) &&
      !!generatePlainText(solutionState) &&
      !!generatePlainText(explanationState) &&
      !!generatePlainText(descriptionState);
    localStorage.setItem('buttonEnabled', this.buttonEnabled);
  };

  generatePlainText = (editorState) => {
    return editorState.getCurrentContent().getPlainText();
  };

  handlePreview = () => {
    if (!this.buttonEnabled) {
      return;
    }
    const {
      titleState,
      solutionState,
      explanationState,
      descriptionState,
    } = this.state;

    const dataObj = {
      title: this.generatePlainText(titleState),
      solution: this.generatePlainText(solutionState),
      explanation: draftToHtml(
        convertToRaw(explanationState.getCurrentContent()),
      ),
      description: draftToHtml(
        convertToRaw(descriptionState.getCurrentContent()),
      ),
    };

    localStorage.setItem('finalData', JSON.stringify(dataObj));
    this.props.history.push(`/preview`);
  };

  render() {
    const {
      titleState,
      solutionState,
      explanationState,
      descriptionState,
    } = this.state;

    this.buttonEnabled = false;
    this.previewBtnState();
    return (
      <div className='myEditor'>
        <Tabs className='myEditor-tabs'>
          <TabPane tab='Title' key='1'>
            <Editor
              editorState={titleState}
              toolbarHidden
              wrapperClassName='demo-wrapper defaultWrapper'
              placeholder='Enter title'
              editorClassName='demo-editor defaultEditor'
              onEditorStateChange={(editorState) => {
                this.setState(
                  {
                    titleState: editorState,
                  },
                  () => this.saveEditorData('titleState'),
                );
              }}
            />
          </TabPane>
          <TabPane tab='Description' key='2'>
            <Editor
              editorState={descriptionState}
              wrapperClassName='demo-wrapper defaultWrapper'
              placeholder='Title description'
              editorClassName='demo-editor defaultEditor defaultEditor-explain'
              onEditorStateChange={(editorState) => {
                this.setState(
                  {
                    descriptionState: editorState,
                  },
                  () => this.saveEditorData('descriptionState'),
                );
              }}
            />
          </TabPane>
          <TabPane tab='Code' key='3'>
            <Editor
              editorState={solutionState}
              toolbarHidden
              placeholder='Enter your program/code only'
              wrapperClassName='demo-wrapper defaultWrapper'
              editorClassName='demo-editor defaultEditor'
              onEditorStateChange={(editorState) => {
                this.setState(
                  {
                    solutionState: editorState,
                  },
                  () => this.saveEditorData('solutionState'),
                );
              }}
            />
          </TabPane>
          <TabPane tab='Explanation' key='4'>
            <Editor
              editorState={explanationState}
              placeholder='Please explain your code in detail'
              wrapperClassName='demo-wrapper defaultWrapper'
              editorClassName='demo-editor defaultEditor defaultEditor-explain'
              onEditorStateChange={(editorState) => {
                this.setState(
                  {
                    explanationState: editorState,
                  },
                  () => this.saveEditorData('explanationState'),
                );
              }}
            />
          </TabPane>
        </Tabs>

        <CustomButton
          inactive={!this.buttonEnabled}
          onClick={this.handlePreview}
        >
          Preview
        </CustomButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentModule: selectCurrentModule(state),
});

//match object is always newly created causing unnessary re-renders
// https://github.com/ReactTraining/react-router/issues/5099
// const mergeProps = (stateProps, dispatchProps) => {
//   const { match, ...filteredStateProps } = stateProps;
//   return Object.assign({}, filteredStateProps, dispatchProps);
// };

const ConnectedMyEditor = connect(mapStateToProps, null)(MyEditor);

MyEditor.whyDidYouRender = true;

export default withRouter(ConnectedMyEditor);
