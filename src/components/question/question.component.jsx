import React from 'react';
import './question.styles.scss';
import { Link } from 'react-router-dom';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { Col, Collapse } from 'antd';

const { Panel } = Collapse;
const someFunc = htmlStr => {
  const sampleMarkup = htmlStr;
  const blocksFromHTML = convertFromHTML(sampleMarkup);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );

  const editorState = EditorState.createWithContent(state);
  return editorState;
};

const styleCol = {
  minWidth: '350px',
};

const collapseStyle = {
  backgroundColor: '#fcfcfc',
  fontSize: '16px',
};
class Question extends React.Component {
  render() {
    const {
      id = 1,
      question: { title = '', explanation = '' },
    } = this.props;

    return (
      <Col style={styleCol} flex='auto'>
        <Collapse style={collapseStyle}>
          <Panel header={title} key={id}>
            <Link className='question_link' to={`/solution/${id}`}>
              <Editor
                toolbarHidden
                editorState={someFunc(explanation)}
                readOnly
              />
            </Link>
          </Panel>
        </Collapse>
      </Col>
    );
  }
}

export default Question;
