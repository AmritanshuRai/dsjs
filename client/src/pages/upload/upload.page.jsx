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
// import '../../components/solution/solution.styles.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
import { selectCurrentModule } from '../../redux/question/question.selector';
import { Tabs } from 'antd';
import {
  TitleSection,
  DescriptionSection,
  ExplanationSection,
  SolutionSection,
} from '../../components/sections/sections.component';
const { TabPane } = Tabs;

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleState: EditorState.createEmpty(),
      solutionState: EditorState.createEmpty(),
      explanationState: EditorState.createEmpty(),
      descriptionState: EditorState.createEmpty(),
      titleReadOnly: false,
      solutionReadOnly: false,
      explanationReadOnly: false,
      descriptionReadOnly: false,
      activeTab: 'title',
    };
  }

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
    // this.setState({
    //   titleState: EditorState.moveFocusToEnd(this.state.titleState),
    // });
  }

  convertFromRawEditorState = () => {
    const titleStateRaw = localStorage.getItem('rawTitleState');
    const descriptionStateRaw = localStorage.getItem('rawDescriptionState');
    const solutionStateRaw = localStorage.getItem('rawSolutionState');
    const explanationStateRaw = localStorage.getItem('rawExplanationState');
    titleStateRaw
      ? this.initEditorData(titleStateRaw, 'titleState')
      : this.setState({
          titleState: EditorState.createEmpty(),
        });
    descriptionStateRaw
      ? this.initEditorData(descriptionStateRaw, 'descriptionState')
      : this.setState({
          descriptionState: EditorState.createEmpty(),
        });
    solutionStateRaw
      ? this.initEditorData(solutionStateRaw, 'solutionState')
      : this.setState({
          solutionState: EditorState.createEmpty(),
        });
    explanationStateRaw
      ? this.initEditorData(explanationStateRaw, 'explanationState')
      : this.setState({
          explanationState: EditorState.createEmpty(),
        });
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
    // console.warn(draftToHtml(convertToRaw(solutionState.getCurrentContent())));
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
  toggleEditor = () => {
    this.setState({
      [this.state.activeTab + 'ReadOnly']: !this.state[
        this.state.activeTab + 'ReadOnly'
      ],
    });
  };

  handleTabClick = (key, event) => {
    event.preventDefault();
    let text = event.currentTarget.textContent.toLowerCase();
    this.setState({
      [text + 'State']: EditorState.moveFocusToEnd(this.state[text + 'State']),
      activeTab: text,
    });
  };

  render() {
    const {
      titleState,
      solutionState,
      explanationState,
      descriptionState,
      titleReadOnly,
      solutionReadOnly,
      explanationReadOnly,
      descriptionReadOnly,
    } = this.state;

    this.buttonEnabled = false;
    this.previewBtnState();

    return (
      <div className='myEditor'>
        <Tabs className='myEditor-tabs' onTabClick={this.handleTabClick}>
          <TabPane tab='Title' key='1'>
            {titleReadOnly ? (
              <TitleSection editorState={titleState} />
            ) : (
              <Editor
                editorState={titleState}
                toolbarHidden
                readOnly={titleReadOnly}
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
            )}
          </TabPane>
          <TabPane tab='Description' key='2'>
            {descriptionReadOnly ? (
              <DescriptionSection editorState={descriptionState} />
            ) : (
              <Editor
                editorState={descriptionState}
                readOnly={descriptionReadOnly}
                wrapperClassName='demo-wrapper defaultWrapper'
                placeholder='Title description'
                editorClassName='demo-editor defaultEditor defaultEditor-explain'
                toolbar={{
                  options: ['inline', 'blockType'],
                  list: { inDropdown: true },
                  blockType: { inDropdown: false },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
                onEditorStateChange={(editorState) => {
                  this.setState(
                    {
                      descriptionState: editorState,
                    },
                    () => this.saveEditorData('descriptionState'),
                  );
                }}
              />
            )}
            {/* <div
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ isReadOnly: false }, () => {
                    this.refs.solutionRef.focusEditor();
                  });
                }}
              >
                lauda dikhao
              </div> */}
          </TabPane>
          <TabPane tab='Solution' key='3'>
            {solutionReadOnly ? (
              <SolutionSection
                solution={this.generatePlainText(solutionState)}
              />
            ) : (
              <Editor
                editorState={solutionState}
                readOnly={solutionReadOnly}
                ref='solutionRef'
                toolbarHidden
                placeholder='Enter your program/code only'
                wrapperClassName='demo-wrapper defaultWrapper'
                editorClassName='demo-editor defaultEditor defaultEditor-explain'
                onEditorStateChange={(editorState) => {
                  this.setState(
                    {
                      solutionState: editorState,
                    },
                    () => this.saveEditorData('solutionState'),
                  );
                }}
              />
            )}
          </TabPane>
          <TabPane tab='Explanation' key='4'>
            {explanationReadOnly ? (
              <ExplanationSection editorState={explanationState} />
            ) : (
              <Editor
                editorState={explanationState}
                readOnly={explanationReadOnly}
                placeholder='Please explain your code in detail'
                wrapperClassName='demo-wrapper defaultWrapper'
                editorClassName='demo-editor defaultEditor defaultEditor-explain'
                toolbar={{
                  options: ['inline', 'blockType'],
                  list: { inDropdown: true },
                  blockType: { inDropdown: false },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
                onEditorStateChange={(editorState) => {
                  this.setState(
                    {
                      explanationState: editorState,
                    },
                    () => this.saveEditorData('explanationState'),
                  );
                }}
              />
            )}
          </TabPane>
        </Tabs>
        <div className='myEditor-actionBtn'>
          <CustomButton onClick={this.toggleEditor}>Toggle Editor</CustomButton>
          <CustomButton
            inactive={!this.buttonEnabled}
            onClick={this.handlePreview}
          >
            Preview
          </CustomButton>
        </div>
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
