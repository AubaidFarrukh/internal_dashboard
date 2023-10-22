import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";
import type {
  TAuthState,
  TSigninPayload,
  TRawUser,
  TSetError,
  TSetFormType,
  TNewPasswordPayload,
  TSigninRes,
  TVerifiedContactRes,
  TVerifyCodePayload,
  TSendVerificationCodePayload,
  TForgotPasswordPayload,
  TForgotPasswordSubmitPayload,
  TForgotPasswordRes,
  TConfirmSigninPayload,
  TConfirmSigninRes,
  TNewPasswordRes,
} from "../../types/auth";
import type { RootState } from "../../context/redux/store";
import { mapRawUserToUser } from "../../utils";

const initialState: TAuthState = {
  username: null,
  password: null,
  formType: "sign_in",
  isSignedIn: false,
  loadingAuth: true,
  sendingCode: false,
  user: null,
  rawUser: null,
  token: null,
  error: null,
  userObj: null,
  unverified: { email: false, phone: false },
  forgotPassword: { username: null, hiddenEmail: null },
};

export const signIn = createAsyncThunk<TSigninRes, TSigninPayload>(
  `auth/signin`,
  async ({ username, password }) => {
    const rawUser = await Auth.signIn({ username, password });
    return { rawUser, challengeName: rawUser.challengeName };
  }
);

export const confirmSignIn = createAsyncThunk<
  TConfirmSigninRes,
  TConfirmSigninPayload
>(`auth/confirmSignIn`, async ({ userObj, code }) => {
  const rawUser = await Auth.confirmSignIn(userObj, code, "SMS_MFA");

  if (rawUser.challengeName && rawUser.challengeName !== "SMS_MFA") {
    return { rawUser, challengeName: rawUser.challengeName };
  }

  const res = (await Auth.verifiedContact(rawUser)) as TVerifiedContactRes;
  return {
    rawUser,
    emailVerified: !Boolean(res.unverified.email),
    phoneVerified: !Boolean(res.unverified.phone_number),
  };
});

export const newPassword = createAsyncThunk<
  TNewPasswordRes,
  TNewPasswordPayload
>(`auth/newPassword`, async ({ user, newPassword }) => {
  const rawUser = await Auth.completeNewPassword(user, newPassword);
  return { rawUser, challengeName: rawUser.challengeName };
});

export const signOut = createAsyncThunk<void, void>(
  `auth/signout`,
  async () => {
    await Auth.signOut();
  }
);

export const loadUser = createAsyncThunk<TRawUser, void>(
  `auth/load`,
  async () => {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: false });
    const rawUser = user;
    return rawUser;
  }
);

export const sendVerificationCode = createAsyncThunk<
  void,
  TSendVerificationCodePayload
>(`auth/sendVerificationCode`, async ({ userObj, contact }) => {
  const attribute = contact === "email" ? "email" : "phone_number";
  await Auth.verifyUserAttribute(userObj, attribute);
});

export const verifyCode = createAsyncThunk<void, TVerifyCodePayload>(
  `auth/verifyCode`,
  async ({ userObj, contact, code }) => {
    const attribute = contact === "email" ? "email" : "phone_number";
    await Auth.verifyUserAttributeSubmit(userObj, attribute, code);
  }
);

export const forgotPassword = createAsyncThunk<
  TForgotPasswordRes,
  TForgotPasswordPayload
>(`auth/forgotPassword`, async ({ username }) => {
  const res = await Auth.forgotPassword(username);
  return { hiddenEmail: res.CodeDeliveryDetails.Destination };
});

export const forgotPasswordSubmit = createAsyncThunk<
  void,
  TForgotPasswordSubmitPayload
>(`auth/forgotPasswordSubmit`, async ({ username, code, password }) => {
  await Auth.forgotPasswordSubmit(username, code, password);
});

const authsice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, { payload }: PayloadAction<TSetError>) => {
      state.error = payload.error;
    },
    setFormType: (state, { payload }: PayloadAction<TSetFormType>) => {
      if (state.formType !== payload.formType) state.error = null;
      state.formType = payload.formType;
    },
  },
  extraReducers: builder => {
    // Reducers for signing in.
    builder.addCase(signIn.fulfilled, (state, { payload, meta }) => {
      state.loadingAuth = false;
      state.sendingCode = false;
      state.username = meta.arg.username;
      state.password = meta.arg.password;
      state.error = null;
      if (payload.challengeName === "NEW_PASSWORD_REQUIRED") {
        state.formType = "new_password";
        state.userObj = payload.rawUser;
      } else if (payload.challengeName === "SMS_MFA") {
        state.formType = "mfa";
        state.userObj = payload.rawUser;
      } else {
        state.formType = "sign_in";
        state.isSignedIn = true;
        state.rawUser = payload.rawUser;
        state.token =
          payload.rawUser.signInUserSession?.accessToken.jwtToken ?? null;
        state.user = mapRawUserToUser(payload.rawUser);
        state.userObj = null;
      }
    });
    builder.addCase(signIn.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.sendingCode = true;
      state.error = null;
      state.rawUser = null;
      state.token = null;
      state.user = null;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      if (action.error.code === "NotAuthorizedException") {
        state.error = action.error.message ?? "Incorrect username or password.";
      } else if (action.error.code === "UserNotFoundException") {
        state.error = action.error.message ?? "User doesn't exist.";
      } else {
        state.error = "Something went wrong!";
      }
      state.isSignedIn = false;
      state.loadingAuth = false;
      state.sendingCode = false;
      state.rawUser = null;
      state.token = null;
      state.user = null;
    });

    // Reducers for mfa.
    builder.addCase(confirmSignIn.fulfilled, (state, { payload }) => {
      state.loadingAuth = false;
      state.password = null;
      state.unverified.email = !payload.emailVerified;
      state.unverified.phone = !payload.phoneVerified;
      state.error = null;
      if (payload.challengeName === "NEW_PASSWORD_REQUIRED") {
        state.formType = "new_password";
        state.userObj = payload.rawUser;
      } else if (payload.emailVerified === false) {
        state.formType = "verify_email";
        state.userObj = payload.rawUser;
      } else if (payload.phoneVerified === false) {
        state.formType = "verify_phone";
        state.userObj = payload.rawUser;
      } else {
        state.formType = "sign_in";
        state.isSignedIn = true;
        state.rawUser = payload.rawUser;
        state.token =
          payload.rawUser.signInUserSession?.accessToken.jwtToken ?? null;
        state.user = mapRawUserToUser(payload.rawUser);
        state.userObj = null;
      }
    });
    builder.addCase(confirmSignIn.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.error = null;
      state.rawUser = null;
      state.token = null;
      state.user = null;
    });
    builder.addCase(confirmSignIn.rejected, (state, action) => {
      state.error = action.error.message ?? "Something went wrong!";
      state.isSignedIn = false;
      state.loadingAuth = false;
      state.rawUser = null;
      state.token = null;
      state.user = null;
    });

    // Reducers for new password.
    builder.addCase(newPassword.fulfilled, (state, { payload }) => {
      state.loadingAuth = false;
      state.error = null;
      if (payload.challengeName === "SMS_MFA") {
        state.formType = "mfa";
        state.userObj = payload.rawUser;
      } else {
        state.formType = "sign_in";
        state.isSignedIn = true;
        state.rawUser = payload.rawUser;
        state.token =
          payload.rawUser.signInUserSession?.accessToken.jwtToken ?? null;
        state.user = mapRawUserToUser(payload.rawUser);
        state.userObj = null;
      }
    });
    builder.addCase(newPassword.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.error = null;
    });
    builder.addCase(newPassword.rejected, (state, action) => {
      state.isSignedIn = false;
      state.loadingAuth = false;
      state.rawUser = null;
      state.user = null;
      state.token = null;
      state.error = action.error.message ?? "Something went wrong!";
    });

    // Reducers for signing out.
    builder.addCase(signOut.fulfilled, state => {
      state.isSignedIn = false;
      state.loadingAuth = false;
      state.error = null;
      state.rawUser = null;
      state.user = null;
      state.token = null;
      state.unverified = { email: false, phone: false };
    });
    builder.addCase(signOut.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.error = null;
      state.rawUser = null;
      state.user = null;
      state.token = null;
    });
    builder.addCase(signOut.rejected, state => {
      state.isSignedIn = false;
      state.loadingAuth = false;
      state.rawUser = null;
      state.user = null;
      state.token = null;
    });

    // Reducers for loading user from local storage.
    builder.addCase(loadUser.fulfilled, (state, { payload: rawUser }) => {
      state.isSignedIn = true;
      state.loadingAuth = false;
      state.error = null;
      state.rawUser = rawUser;
      state.token = rawUser.signInUserSession?.accessToken.jwtToken ?? null;
      state.user = mapRawUserToUser(rawUser!);
    });
    builder.addCase(loadUser.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.error = null;
    });
    builder.addCase(loadUser.rejected, state => {
      state.isSignedIn = false;
      state.loadingAuth = false;
    });

    // Reducers for sending verification code to email/phone.
    builder.addCase(sendVerificationCode.fulfilled, (state, action) => {
      state.isSignedIn = false;
      state.loadingAuth = false;
      state.sendingCode = false;
      state.error = null;
      state.formType =
        action.meta.arg.contact === "email"
          ? "verify_email_submit"
          : "verify_phone_submit";
    });
    builder.addCase(sendVerificationCode.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.sendingCode = true;
      state.error = null;
    });
    builder.addCase(sendVerificationCode.rejected, (state, { error }) => {
      state.isSignedIn = false;
      state.error = error.message ?? "Error sending the code.";
      state.loadingAuth = false;
      state.sendingCode = false;
    });

    // Reducers for verifying code sent to email/phone.
    builder.addCase(verifyCode.fulfilled, (state, action) => {
      state.loadingAuth = false;
      state.error = null;
      if (action.meta.arg.contact === "email" && state.unverified.phone) {
        state.unverified.email = false;
        state.formType = "verify_phone";
        state.isSignedIn = false;
      } else if (
        action.meta.arg.contact === "phone" &&
        state.unverified.email
      ) {
        state.unverified.phone = false;
        state.formType = "verify_email";
        state.isSignedIn = false;
      } else {
        state.isSignedIn = true;
        state.formType = "sign_in";
        state.rawUser = state.userObj;
        state.token =
          state.rawUser?.signInUserSession?.accessToken.jwtToken ?? null;
        state.user = mapRawUserToUser(state.userObj);
        state.userObj = null;
      }
    });
    builder.addCase(verifyCode.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.error = null;
    });
    builder.addCase(verifyCode.rejected, (state, { error }) => {
      state.isSignedIn = false;
      state.error = error.message ?? "Error verifying the code.";
      state.loadingAuth = false;
    });

    // Reducers for starting forgot-password session.
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loadingAuth = false;
      state.error = null;
      state.forgotPassword.username = action.meta.arg.username;
      state.forgotPassword.hiddenEmail = action.payload.hiddenEmail;
      state.formType = "forgot_password_submit";
    });
    builder.addCase(forgotPassword.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isSignedIn = false;
      if (action.error.code === "UserNotFoundException") {
        state.error = "User doesn't exist.";
      } else {
        state.error = action.error.message ?? "Error sending the code.";
      }
      state.loadingAuth = false;
    });

    // Reducers for completing forgot password session.
    builder.addCase(forgotPasswordSubmit.fulfilled, state => {
      state.loadingAuth = false;
      state.error = "Sign in with your new password.";
      state.forgotPassword.username = null;
      state.forgotPassword.hiddenEmail = null;
      state.formType = "sign_in";
    });
    builder.addCase(forgotPasswordSubmit.pending, state => {
      state.isSignedIn = false;
      state.loadingAuth = true;
      state.error = null;
    });
    builder.addCase(forgotPasswordSubmit.rejected, (state, { error }) => {
      state.isSignedIn = false;
      state.error = error.message ?? "Error updating the password.";
      state.loadingAuth = false;
    });
  },
});

export const selectFormType = (state: RootState) => state.auth.formType;
export const selectIsSignedIn = (state: RootState) => state.auth.isSignedIn;
export const selectLoadingAuth = (state: RootState) => state.auth.loadingAuth;
export const selectSendingCode = (state: RootState) => state.auth.sendingCode;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectError = (state: RootState) => state.auth.error;
export const selectUserObj = (state: RootState) => state.auth.userObj;
export const selectForgotPassword = (state: RootState) =>
  state.auth.forgotPassword;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectPassword = (state: RootState) => state.auth.password;

export const { setError, setFormType } = authsice.actions;

export default authsice.reducer;
