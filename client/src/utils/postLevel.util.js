export const postLevel = async ({ id, level }, token) => {
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

export const updateLevel = async (level, token, levelId) => {
  console.log('level, token, levelId: ', level, token, levelId);
  try {
    let response = await fetch(`/api/v1/level/${levelId}`, {
      method: 'PUT',
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
