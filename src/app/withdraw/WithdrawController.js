import Provider from "./provider";

class WithdrawController {
  constructor() {
    this.REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.provider = new Provider();
    this.verifyCode = "";
    this.userEmail = "";
    this.msgKey = "";
  }

  async getVerifyCode(userEmail) {
    if (this.REGEX.test(userEmail)) {
      var response = this.provider.SEND_OTP_TO_EMAIL({
        method: "POST",
        userEmail: userEmail,
      });
      this.userEmail = userEmail;
      this.verifyCode = (await response).data.code;
      this.msgKey = (await response).data.msgKey;

      return;
    }
  }

  checkingVerifyValidate(userInput) {
    if (userInput === this.verifyCode.toString()) {
      return true;
    }
    return false;
  }

  async deleteUserInfo({ email, msgKey }) {
    var response = await this.provider.USER_WITHDRAWAL({
      email: email,
      msgKey: msgKey,
    });

    return;
  }
}

export default WithdrawController;
