import { EditorState, ContentState, convertFromHTML } from 'draft-js';

export const toEditorState = (htmlStr) => {
  const sampleMarkup = htmlStr;
  const blocksFromHTML = convertFromHTML(sampleMarkup);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );

  const editorState = EditorState.createWithContent(state);
  return editorState;
};
