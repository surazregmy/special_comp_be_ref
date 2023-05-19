const {
  loginAuthSer,
  signUpAuthSer,
  refreshTokenAuthSer,
  logoutAuthSer,
  verifyEmailSer,
  saveDeviceTokenSer,
  resetPasswordEmailSer,
  resetPasswordSer,
  sendInvitationLinkSer,
  emailVerificationSer
} = require("../../use-case/auth");
// #########

const loginAuthFun = require("./login-auth");
const signUpAuthFun = require("./signup-auth");
const refreshTokenAuthFun = require("./refresh-token-auth");
const logoutAuthConFun = require("./logout-auth");
const verifyEmailConFun = require("./verify-email");
const saveDeviceTokenFun = require("./save-device-token");
const resetPasswordEmailFun = require("./reset-password-email");
const resetPasswordFun = require("./reset-password");
const sendInvitationLinkFun = require("./send-invitation-link");
const emailVerificationFun = require("./email-verification");

// #########

const authLoginController = loginAuthFun({ loginAuthSer });
const authSignUpController = signUpAuthFun({ signUpAuthSer });
const authRefreshTokenController = refreshTokenAuthFun({ refreshTokenAuthSer });
const authLogoutController = logoutAuthConFun({ logoutAuthSer });
const emailVerifyController = verifyEmailConFun({ verifyEmailSer });
const saveDeviceTokenController = saveDeviceTokenFun({ saveDeviceTokenSer });
const resetPasswordEmailController = resetPasswordEmailFun({
  resetPasswordEmailSer,
});
const resetPasswordController = resetPasswordFun({
  resetPasswordSer,
});
const emailVerificationController = emailVerificationFun({
  emailVerificationSer
})

const sendInvitationLinkController = sendInvitationLinkFun({
  sendInvitationLinkSer,
});
// #########
const services = Object.freeze({
  authLoginController,
  authSignUpController,
  authRefreshTokenController,
  authLogoutController,
  emailVerifyController,
  saveDeviceTokenController,
  resetPasswordEmailController,
  resetPasswordController,
  sendInvitationLinkController,
  emailVerificationController
});

module.exports = services;