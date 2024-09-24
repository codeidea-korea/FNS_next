"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "@/app/withdraw/css/withdraw.css";
import { CONSTANT, STEP_TWO_CONSTANT } from "@/app/withdraw/WithdrawConstant";
import WithdrawController from "@/app/withdraw/WithdrawController";

export const CustomToast = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className="toast">
      <div className="toast-message">{message}</div>
    </div>
  );
};

const CustomTable = ({ isDarkMode }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>목적</th>
          <th>보유기간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="left-cell">{STEP_TWO_CONSTANT.row1}</td>
          <td className="center-cell">영구보관</td>
        </tr>
        <tr>
          <td className="left-cell">{STEP_TWO_CONSTANT.row2}</td>
          <td className="center-cell">6개월</td>
        </tr>
        <tr>
          <td className="left-cell">{STEP_TWO_CONSTANT.row3}</td>
          <td className="center-cell">3개월</td>
        </tr>
      </tbody>
    </table>
  );
};

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <div id="checkBoxDiv" style={{ display: "flex", alignItems: "center" }}>
      <input
        id="checkBox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="checkBox">{STEP_TWO_CONSTANT.checkBoxTitle}</label>
    </div>
  );
};

export default function WithdrawLeave() {
  const [checked, setChecked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [withdrawController, setWithdrawController] = useState(null);

  const navigate = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("withdrawController");
    if (data) {
      const withdrawController = JSON.parse(data);
      setWithdrawController(withdrawController);
    }
  }, []);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  // 인증번호 받기 BTN STYLE
  const buttomStyle = {
    backgroundColor: checked ? "#000000" : "#EAECEF",
  };

  const titleStyle = {
    color: checked ? "#FFFFFF" : "#AAAAAA",
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

          <h3 id="withdrawSubTitle">{STEP_TWO_CONSTANT.pleaseCheck}</h3>
        </div>
        <div id="seperateDiv">
          <div id="seperateLine"></div>
        </div>
        <h1 id="personalInfoTitle">{STEP_TWO_CONSTANT.deletePersonalInfo}</h1>
        <h1 id="noticePersonalInfo" style={{ whiteSpace: "pre-line" }}>
          {STEP_TWO_CONSTANT.noticePersonalInfo}
        </h1>
        <div>
          <CustomTable />
        </div>
        <CustomCheckbox checked={checked} onChange={handleCheckboxChange} />
        <div>
          <button
            className="getVerifyCode"
            onClick={async () => {
              if (checked) {
                await new WithdrawController().deleteUserInfo({
                  email: withdrawController.userEmail,
                  msgKey: withdrawController.msgKey,
                });
                setShowToast(true);
                await setTimeout(() => setShowToast(false), 1500);
                navigate.push("/");
              }
            }}
            style={buttomStyle}
            disabled={!checked}
          >
            <h1 id="verify" style={titleStyle}>
              {CONSTANT.check}
            </h1>
          </button>
          <CustomToast show={showToast} message={STEP_TWO_CONSTANT.release} />
        </div>
      </div>
    </>
  );
}
