import * as yup from "yup";

export const signinFormSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

export const confirmSigninFormSchema = yup.object().shape({
  code: yup.string().length(6, "Invalid code").required("Required"),
});

export const newPasswordFormSchema = yup.object().shape({
  newPassword: yup.string().required("Required"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("newPassword")], "Passwords don't match."),
});

export const verifyCodeSchema = yup.object().shape({
  code: yup.string().length(6, "Invalid code").required("Required"),
});

export const forgotPasswordSchema = yup.object().shape({
  username: yup.string().required("Required"),
});

export const forgotPasswordSubmitSchema = yup.object().shape({
  code: yup.string().required("Required"),
  newPassword: yup.string().required("Required"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("newPassword")], "Passwords don't match."),
});
