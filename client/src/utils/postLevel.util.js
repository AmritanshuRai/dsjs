export const postLevel = async ({ id, level }, token) => {
  console.log('here');
  console.warn('token: ', token);
  console.warn('id, level: ', id, level);

  try {
    let response = await fetch(`/api/v1/questions/${id}/level`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        level,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
