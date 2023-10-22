import type { TPermissionName, TRole, TUser } from "./users";

export type TFormType =
  | "sign_in"
  | "mfa"
  | "new_password"
  | "verify_email"
  | "verify_email_submit"
  | "verify_phone"
  | "verify_phone_submit"
  | "forgot_password"
  | "forgot_password_submit";

export type TContactType = "email" | "phone";

export type TSigninFormValues = { username: string; password: string };

export type TMfaFormValues = { code: string };

export type TNewPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export type TVerifyCodeFormValues = { code: string };

export type TForgotPasswordFormValues = { username: string };

export type TForgotPasswordSubmitFormValues = {
  code: string;
  newPassword: string;
  confirmPassword: string;
};

export type TAuthState = {
  username: string | null;
  password: string | null;
  formType: TFormType;
  isSignedIn: boolean;
  loadingAuth: boolean;
  sendingCode: boolean;
  user: TUser | null;
  rawUser: TRawUser | null;
  token: string | null;
  error: string | null;
  userObj: any | null;
  unverified: { email: boolean; phone: boolean };
  forgotPassword: { username: string | null; hiddenEmail: string | null };
};

export type TSigninPayload = TSigninFormValues;
export type TSigninRes = {
  rawUser: TRawUser;
  challengeName?: string;
};

export type TConfirmSigninPayload = {
  userObj: TRawUser;
  code: string;
};
export type TConfirmSigninRes = {
  rawUser: TRawUser;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  challengeName?: string;
};
export type TVerifiedContactRes = {
  verified: { email?: string; phone_number?: string };
  unverified: { email?: string; phone_number?: string };
};

export type TNewPasswordPayload = { newPassword: string; user: any };
export type TNewPasswordRes = {
  rawUser: TRawUser;
  challengeName?: string;
};

export type TSendVerificationCodePayload = {
  userObj: TRawUser;
  contact: TContactType;
};

export type TVerifyCodePayload = TVerifyCodeFormValues &
  TSendVerificationCodePayload;

export type TForgotPasswordPayload = TForgotPasswordFormValues;

export type TForgotPasswordRes = { hiddenEmail: string };

export type TForgotPasswordSubmitPayload = TForgotPasswordPayload & {
  code: string;
  password: string;
};

export type TSetError = { error: string | null };

export type TSetFormType = { formType: TFormType };

export type TSaveUserPayload = { user: TUser };

export type TRawUser = {
  username: string;
  pool: {
    userPoolId: string;
    clientId: string;
    client: {
      endpoint: string;
      fetchOptions: any;
    };
    advancedSecurityDataCollectionFlag: boolean;
    storage: {
      "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.refreshToken": string;
      "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.userData": string;
      "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.clockDrift": string;
      "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.accessToken": string;
      "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.LastAuthUser": string;
      "amplify-signin-with-hostedUI": string;
      "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.idToken": string;
    };
  };
  challengeName?: string;
  challengeParam?: {
    PASSWORD_CLAIM_SECRET_BLOCK: string;
    PASSWORD_CLAIM_SIGNATURE: string;
    TIMESTAMP: string;
    USERNAME: string;
  };
  Session: null | any;
  client: {
    endpoint: string;
    fetchOptions: any;
  };
  signInUserSession?: {
    idToken: {
      jwtToken: string;
      payload: {
        sub: string;
        email_verified: boolean;
        iss: string;
        "cognito:username": string;
        origin_jti: string;
        aud: string;
        event_id: string;
        token_use: string;
        auth_time: number;
        exp: number;
        iat: number;
        jti: string;
        email: string;
      };
    };
    refreshToken: {
      token: string;
    };
    accessToken: {
      jwtToken: string;
      payload: {
        sub: string;
        iss: string;
        client_id: string;
        origin_jti: string;
        event_id: string;
        token_use: string;
        scope: string;
        auth_time: number;
        exp: number;
        iat: number;
        jti: string;
        username: string;
      };
    };
    clockDrift: number;
  };
  authenticationFlowType: string;
  storage: {
    "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.refreshToken": string;
    "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.userData": string;
    "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.clockDrift": string;
    "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.accessToken": string;
    "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.LastAuthUser": string;
    "amplify-signin-with-hostedUI": string;
    "CognitoIdentityServiceProvider.6g2p413hfa2ekvu2ev6gj6d842.sharjeel.idToken": string;
  };
  keyPrefix: string;
  userDataKey: string;
  attributes: {
    sub: string;
    "custom:lastLogin": number;
    "custom:role": TRole;
    email: string;
    email_verified?: boolean;
    family_name: string;
    given_name: string;
    phone_number: string;
    // phone_number_verified?: boolean;
    picture: string;
    // created_at?: number;
    updated_at: number;
  };
  preferredMFA: string;
};

export type TIdTokenPayload = {
  token_use: "id";
  iat: number;
  exp: number;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  "cognito:username": string;
  "custom:role": TRole;
  picture: string;
  "custom:lastLogin": number;
  "cognito:groups": TPermissionName[];
  updated_at: number;
  sub: string;
  iss: string;
  aud: string;
  auth_time: number;
  origin_jti: string;
  event_id: string;
  jti: string;
};
