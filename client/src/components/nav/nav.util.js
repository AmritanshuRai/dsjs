export const clearStorage = () => {
  localStorage.removeItem('rawTitleState');
  localStorage.removeItem('rawSolutionState');
  localStorage.removeItem('rawExplanationState');
  localStorage.removeItem('rawDescriptionState');
  localStorage.removeItem('buttonEnabled');
  localStorage.removeItem('finalData');
  localStorage.removeItem('id');
};
