exports.createUserWithEmailAndPassword = async (email, password, name) => {
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
    // if (response.status !== 200 && response.status !== 201) {
    //   throw new Error('failed!');
    // }
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

exports.verifyEmail = async (tokenFromEmail) => {
  try {
    let response = await fetch(`/api/v1/auth/verifyemail/${tokenFromEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

exports.signInWithEmailAndPassword = async (email, password) => {
  try {
    let response = await fetch(`/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

exports.fetchCurrentUser = async (token) => {
  try {
    let response = await fetch(`/api/v1/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

exports.forgotPassword = async ({ email }) => {
  try {
    let response = await fetch(`/api/v1/auth/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

exports.resetPassword = async ({ resetToken, password }) => {
  try {
    let response = await fetch(`/api/v1/auth/resetpassword/${resetToken}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
      }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

exports.sendGoogleToken = async ({ profileObj, tokenId }) => {
  try {
    let response = await fetch(`/api/v1/auth/googlelogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: tokenId,
        profileObj,
      }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

exports.sendFacebookToken = async ({ userID, accessToken }) => {
  try {
    let response = await fetch(`/api/v1/auth/facebooklogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID,
        accessToken,
      }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};
