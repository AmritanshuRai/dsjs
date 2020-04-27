import React from 'react';
import './question.styles.scss';
import { Link } from 'react-router-dom';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { DislikeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Col, Collapse, Button, Rate } from 'antd';

const { Panel } = Collapse;
const someFunc = (htmlStr) => {
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
  width: '50%',
  minWidth: '400px',
};

const collapseStyle = {
  backgroundColor: '#fcfcfc',
  fontSize: '16px',
  overflowWrap: 'break-word',
};

const Question = (props) => {
  // const IconText = ({ icon, text }) => (
  //   <span>
  //     {React.createElement(icon, { style: { marginRight: 8 } })}
  //     {text}
  //   </span>
  // );

  const {
    id = 1,
    question: { title = '', explanation = '' },
  } = props;

  return (
    <Col style={styleCol} flex='auto' className='question'>
      <Collapse style={collapseStyle}>
        <Panel header={title} key={id}>
          <Editor toolbarHidden editorState={someFunc(explanation)} readOnly />
          <div className='f question_footer'>
            <Link className='question_link' to={`/solution/${id}`}>
              <Button>Solution</Button>
            </Link>
            {/* <Rate character={<HeartOutlined />} allowHalf /> */}
            <div className='f question_footer-rating'>
              <span className='f question_footer-icon'>
                <Rate character={<StarOutlined />} count={1} />
                <span className='question_footer-number'>{101}</span>
              </span>
              <div className='f question_footer-vote'>
                <span className='f question_footer-icon'>
                  <Rate character={<DislikeOutlined />} count={1} />
                  <span className='question_footer-number'>{201}</span>
                </span>

                <span className='f question_footer-icon'>
                  <Rate character={<LikeOutlined />} count={1} />
                  <span className='question_footer-number'>{201}</span>
                </span>
              </div>
            </div>
            {/* <IconText
              icon={StarOutlined}
              text='156'
              key='list-vertical-star-o'
            />
            ,
            <IconText
              icon={LikeOutlined}
              text='156'
              key='list-vertical-like-o'
            /> */}
          </div>
        </Panel>
      </Collapse>
    </Col>
  );
};

export default Question;
