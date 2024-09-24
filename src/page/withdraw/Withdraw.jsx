"use client";

import { useRouter } from "next/navigation";
import "@/app/withdraw/css/withdraw.css";
import { CONSTANT } from "@/app/withdraw/WithdrawConstant";
import WithdrawController from "@/app/withdraw/WithdrawController";

import { useContext, useEffect, useState } from "react";

const withdrawController = new WithdrawController();

export const CustomToast = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className="toast">
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default function Withdraw() {
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(withdrawController.REGEX.test(event.target.value));
  };

  const handleVerifyCode = (event) => {
    setVerifyCode(event.target.value);
  };

  // 인증번호 받기 BTN STYLE
  const buttomStyle = {
    backgroundColor: isEmailValid ? "#000000" : "#EAECEF",
  };

  const titleStyle = {
    color: isEmailValid ? "#FFFFFF" : "#AAAAAA",
  };

  // 확인 BTN STYLE
  const checkButtomStyle = {
    backgroundColor: verifyCode ? "#FF0000" : "#EAECEF",
  };

  const checkTitleStyle = {
    color: verifyCode ? "#FFFFFF" : "#AAAAAA",
  };

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
        data-rh="true"
      />
      <title>Withdraw Page</title>
      <div className="withdraw">
        <div>
          <div>
            <h1 className="logo" id="withdrawLogo">
              <img src="/img/fns.svg" alt="패션&스타일 로고" />
            </h1>
          </div>

          <h1 id="withdrawTitle">{CONSTANT.withdrawTitle}</h1>

          <h3 id="withdrawSubTitle">{CONSTANT.withdrawSubTitle}</h3>
        </div>

        <div>
          <input
            className="inputBoxEmail"
            type="text"
            value={email}
            onChange={handleChange}
            placeholder={CONSTANT.inputEmail}
          />
        </div>

        <div>
          <button
            className="getVerifyCode"
            onClick={() => {
              withdrawController.getVerifyCode(email);
              setIsClicked(true);
            }}
            style={buttomStyle}
            disabled={!isEmailValid}
          >
            <h1 id="verify" style={titleStyle}>
              {isClicked ? CONSTANT.retryVerify : CONSTANT.getVerify}
            </h1>
          </button>
        </div>

        {/* isClicked가 true일 때만 아래 요소들을 렌더링 */}
        {isClicked && (
          <>
            <div>
              <h1 id="askVerifyCode">{`${email} ${CONSTANT.askVerifyCode}`}</h1>
            </div>
            <div>
              <input
                className="inputBoxEmail"
                type="text"
                value={verifyCode}
                onChange={handleVerifyCode}
                placeholder={CONSTANT.inputVerifyCode}
              />
            </div>
            <div>
              <button
                className="checkVerifyCode"
                onClick={() => {
                  if (withdrawController.checkingVerifyValidate(verifyCode)) {
                    sessionStorage.setItem(
                      "withdrawController",
                      JSON.stringify(withdrawController),
                    );
                    // navigate.push('/leave', {state: { withdrawController }});
                    navigate.push("/leave");
                  } else {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 1500);
                  }
                }}
                style={checkButtomStyle}
                disabled={verifyCode == ""}
              >
                <h1 id="verify" style={checkTitleStyle}>
                  {CONSTANT.check}
                </h1>
              </button>
              <CustomToast
                show={showToast}
                message={CONSTANT.wrongVerifyCode}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
