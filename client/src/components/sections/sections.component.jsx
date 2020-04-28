import React, { useEffect } from 'react';
import '../solution/solution.styles.scss';
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/scss/github.scss';
import javascript from 'highlight.js/lib/languages/javascript';

// import jsbeautifier from 'js-beautify/js';
import beautify from 'js-beautify/js';
import { Editor } from 'react-draft-wysiwyg';
import { toEditorState } from '../../utils/editor.utils';

const beautifyConfig = () => {
  let opts = {};
  opts.preserve_newlines = false;
  opts.space_in_empty_paren = true;
  opts.brace_style = 'collapse';
  opts.jslint_happy = true;
  // opts.wrap_line_length = 200;
  return opts;
};
export const TitleSection = ({ title, editorState }) => {
  return (
    <div className='section'>
      <div className='heading'>TITLE</div>
      <Editor
        toolbarHidden
        editorState={title ? toEditorState(title) : editorState}
        readOnly
      />
    </div>
  );
};

export const DescriptionSection = ({ description, editorState }) => {
  return (
    <div className='section'>
      <div className='heading'>DESCRIPTION</div>
      <Editor
        toolbarHidden
        editorState={description ? toEditorState(description) : editorState}
        readOnly
      />
    </div>
  );
};

export const SolutionSection = ({ solution }) => {
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }, []);

  return (
    <div className='section'>
      <div className='heading'>SOLUTION</div>
      <pre>
        <code>{beautify(solution, beautifyConfig())}</code>
      </pre>
    </div>
  );
};

export const ExplanationSection = ({ explanation, editorState }) => {
  return (
    <div className='section'>
      <div className='heading'>EXPLANATION</div>
      <Editor
        toolbarHidden
        editorState={explanation ? toEditorState(explanation) : editorState}
        readOnly
      />
    </div>
  );
};
