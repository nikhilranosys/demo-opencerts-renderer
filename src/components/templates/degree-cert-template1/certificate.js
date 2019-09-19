import PropTypes from "prop-types";
import { get } from "lodash";
import React from "react";
import { tz } from "moment-timezone";

import { CERT1_BKG_IMG } from "../common/images";
import { getDegreeFontSize } from "../common/functions";
import "../common/style.scss";
import "../common/print.scss";

export const TIMEZONE = "Asia/Singapore";

const Template = ({ document }) => {
  const certificate = document;
  
  // Declaring what variables will be available to the template from the certificate
  const certificateName = get(certificate, "name");
  const honors = get(certificate, "additionalData.honors", "\u00a0");
  const recipientName = get(certificate, "recipient.name");
  const attainmentDate = get(certificate, "attainmentDate");
  const SerialNumber = get(certificate, "additionalData.serialNumber");
  const signature1 = get(certificate, "additionalData.signature1");
  const signature2 = get(certificate, "additionalData.signature2");
  const signature3 = get(certificate, "additionalData.signature3");
  const signature4 = get(certificate, "additionalData.signature4");
  const seal = get(certificate, "additionalData.seal");

  const degreeFontSize = getDegreeFontSize(certificateName);

  const awardDate = tz(attainmentDate, TIMEZONE).format("DD MMM YYYY");

  return (
    <div
      className="transcript"
      style={{
        width: "1097px",
        margin: "auto",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url('${CERT1_BKG_IMG}')`,
        padding: "1px 5px",
        backgroundSize: "cover",
        backgroundPosition: "canter center",
        height: "833px",
        position: "relative"
      }}
    >
      <div className="col-md-12 text-center" style={{ fontFamily: "sarif" }}>
        <div
          className="row"
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginTop: "225px"
          }}
        >
          <div className="col-md-12">{recipientName}</div>
        </div>
        <div
          className="row"
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginTop: "60px",
            color: "#9c9062"
          }}
        >
          <div className="col-md-12" style={{
                fontSize: degreeFontSize + "px"
              }}>{certificateName}</div>
        </div>
        <div
          className="row"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#9c9062",
            marginTop: "10px"
          }}
        >
          <div className="col-md-12">{honors}</div>
        </div>
        <div
          className="row"
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginTop: "110px"
          }}
        >
          <div className="col-md-12">{awardDate}</div>
        </div>
        <div
          className="row"
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginTop: "25px"
          }}
        >
          <div
            style={{ width: "40%", textAlign: "right", paddingRight: "25px" }}
          >
            <img src={signature1} alt="" />
            <br />
            <img src={signature2} alt="" />
          </div>
          <div style={{ width: "20%" }}>
            <img src={seal} alt="" />
          </div>
          <div style={{ width: "40%", textAlign: "left", paddingLeft: "25px" }}>
            <img src={signature3} alt="" />
            <br />
            <img src={signature4} alt="" />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          padding: "0 25px 5px",
          right: "0",
          bottom: "0",
          fontSize: "8px"
        }}
      >
        {SerialNumber}
      </div>
    </div>
  );
};

Template.propTypes = {
  certificate: PropTypes.object.isRequired,
  updateParentHeight: PropTypes.func
};
export default Template;
