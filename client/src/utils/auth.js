export const verifyEmail = async (tokenFromEmail) => {
  try {
    let response = await fetch(`/api/v1/auth/verifyemail/${tokenFromEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userRes = await response.json();
    return normalizeUserData(userRes);
  } catch (err) {
    console.error(err);
  }
};
export const createUser = async (email, password, name) => {
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
export const signInWithEmailAndPassword = async ({ email, password }) => {
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
    const userRes = await response.json();
    return normalizeUserData(userRes);
  } catch (err) {
    console.error(err);
  }
};
export const normalizeUserData = (userRes) => {
  if (!userRes.data.level) {
    return userRes;
  }
  let normalizedUser = userRes.data.level.reduce(function (obj, item) {
    obj[item.question] = {
      level: item.level,
      id: item._id,
    };
    return obj;
  }, {});
  const userData = {
    data: {
      displayName: userRes.data.displayName,
      email: userRes.data.email,
      id: userRes.data.id,
      token: userRes.data.token,
      yayNay: normalizedUser,
    },
    success: userRes.success,
  };
  return userData;
};

export const fetchCurrentUser = async (token) => {
  try {
    let response = await fetch(`/api/v1/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const userRes = await response.json();
    return normalizeUserData(userRes);
  } catch (err) {
    console.error(err);
  }
};

export const forgotPassword = async ({ email }) => {
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

export const resetPassword = async ({ resetToken, password }) => {
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

    const userRes = await response.json();
    return normalizeUserData(userRes);
  } catch (err) {
    console.error(err);
  }
};

export const sendGoogleToken = async ({ profileObj, tokenId }) => {
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
    const userRes = await response.json();
    return normalizeUserData(userRes);
  } catch (err) {
    console.error(err);
  }
};

export const sendFacebookToken = async ({ userID, accessToken }) => {
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
    const userRes = await response.json();
    return normalizeUserData(userRes);
  } catch (err) {
    console.error(err);
  }
};

export const sendGithubCode = async (code) => {
  try {
    let response = await fetch(`/api/v1/auth/getgithubcode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
      }),
    });
    const userRes = await response.json();
    return normalizeUserData(userRes);
  } catch (err) {
    console.error(err);
  }
};
