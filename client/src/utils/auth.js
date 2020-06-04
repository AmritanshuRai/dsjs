export const createUserWithEmailAndPassword = async (email, password, name) => {
  // const { collectionName, title, solution, explanation, description } = dataObj;
  try {
    let response = await fetch(`/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error('failed!');
    }
    const { shortMsg } = await response.json();
    return shortMsg;
    // console.warn('result: ', results);
    // return results.result.ops[0];
  } catch (err) {
    console.log(err);
  }
};
