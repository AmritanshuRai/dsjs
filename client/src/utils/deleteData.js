export const deleteData = async (id) => {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
};
