const authLoginFun = require("./login-auth");
const authSignUpFun = require("./signup-auth");
const authRefreshTokenFun = require("./refresh-token-auth");
const authLogoutFun = require("./logout-auth");
const emailVerifyFun = require("./verify-email");
const saveDeviceTokenFun = require("./save-device-token");
const resetPasswordEmailFun = require("./reset-password-email");
const sendInvitationLinkFun = require("./send-invitation-link");
const resetPasswordFun = require("./reset-password");
const emailVerificationFun = require("./email-verification");

const authRepository = require("../../data-access/user");
const institutionRepository = require("../../data-access/institution");
const profileRepository = require("../../data-access/profile");

const { localStategyPassport } = require("../../config/passport/index");

const loginAuthSer = authLoginFun({ authRepository, localStategyPassport });
const signUpAuthSer = authSignUpFun({
  authRepository,
  institutionRepository,
  profileRepository,
});
const refreshTokenAuthSer = authRefreshTokenFun({ authRepository });
const logoutAuthSer = authLogoutFun({ authRepository });
const verifyEmailSer = emailVerifyFun({ authRepository });
const saveDeviceTokenSer = saveDeviceTokenFun({ authRepository });
const resetPasswordEmailSer = resetPasswordEmailFun({ authRepository });
const sendInvitationLinkSer = sendInvitationLinkFun({
  authRepository,
  institutionRepository,
});
const resetPasswordSer = resetPasswordFun({ authRepository });
const emailVerificationSer = emailVerificationFun({ authRepository });

const services = Object.freeze({
  loginAuthSer,
  signUpAuthSer,
  refreshTokenAuthSer,
  logoutAuthSer,
  verifyEmailSer,
  saveDeviceTokenSer,
  resetPasswordEmailSer,
  resetPasswordSer,
  sendInvitationLinkSer,
  emailVerificationSer,
});

module.exports = services;
module.exports = {
  loginAuthSer,
  signUpAuthSer,
  refreshTokenAuthSer,
  logoutAuthSer,
  verifyEmailSer,
  saveDeviceTokenSer,
  resetPasswordEmailSer,
  resetPasswordSer,
  sendInvitationLinkSer,
  emailVerificationSer,
};
