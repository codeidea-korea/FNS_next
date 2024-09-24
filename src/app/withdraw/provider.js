import axios from "axios";

class Provider {
  constructor() {
    this.url = "https://api.fashionandstyle.com/api/v1";
    // this.url = "http://testapi.fashionandstyle.com:8010/api/v1"
  }

  async SEND_OTP_TO_EMAIL({ method, userEmail }) {
    axios.defaults.baseURL = `${this.url}/comm/send_otp`;
    const requestModel = {
      user_email: userEmail,
    };

    const headers = {
      "system-key": `${process.env.NEXT_PUBLIC_SYSTEM_KEY}`,
    };

    let response;

    switch (method) {
      case "POST":
        response = await axios.post("", requestModel, { headers });
        break;
      case "GET":
        response = await axios.get("");
        break;
      case "PUT":
        response = await axios.put("", requestModel);
        break;
      case "PATCH":
        response = await axios.patch("", requestModel);
        break;
      case "DELETE":
        response = await axios.delete("");
        break;
      default:
        throw new Error("Method Not Found");
    }

    return {
      statusCode: response.status,
      data: response.data,
    };
  }

  async USER_WITHDRAWAL({ email, msgKey }) {
    axios.defaults.baseURL = `${this.url}/member/user_withdrawal_by_web`;
    let response;

    const requestModel = {
      user_email: email,
      msg_key: msgKey,
    };

    const headers = {
      "system-key": `${process.env.NEXT_PUBLIC_SYSTEM_KEY}`,
    };

    response = await axios.delete("", {
      headers: headers,
      data: requestModel,
    });
    return {
      statusCode: response.status,
      data: response.data,
    };
  }
}

export default Provider;
