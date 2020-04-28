import React from 'react';
import './question.styles.scss';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { DislikeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Col, Collapse, Button, Rate } from 'antd';
import { toEditorState } from '../../utils/editor.utils';

const { Panel } = Collapse;

const Question = (props) => {
  const {
    id = 1,
    question: { title = '', description = '' },
  } = props;

  return (
    <Col flex='auto' className='question'>
      <Collapse className='question-collapseStyle'>
        <Panel header={title} key={id}>
          <Editor
            toolbarHidden
            editorState={toEditorState(description)}
            readOnly
          />
          <div className='f question_footer'>
            <Link className='question_link' to={`/solution/${id}`}>
              <Button>Solution</Button>
            </Link>
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
          </div>
        </Panel>
      </Collapse>
    </Col>
  );
};

export default Question;
