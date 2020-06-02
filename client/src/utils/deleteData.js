export const deleteData = async (id) => {
  await fetch(`/api/v1/${id}`, {
    method: 'DELETE',
  });
};
