import PropTypes from "prop-types";
import { get } from "lodash";
import React from "react";
import { tz } from "moment-timezone";

import { CERT3_BKG_IMG } from "../common/images";
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
  const signature1 = get(certificate, "additionalData.Signature1");
  const signature2 = get(certificate, "additionalData.Signature2");
  const signature3 = get(certificate, "additionalData.Signature3");
  const signature4 = get(certificate, "additionalData.Signature4");
  const seal = get(certificate, "additionalData.Seal");
  const seal2 = get(certificate, "additionalData.Seal2");

  const degreeFontSize = getDegreeFontSize(certificateName);

  const awardDate = tz(attainmentDate, TIMEZONE).format("DD MMM YYYY");

  return (
    <div
      className="transcript"
      style={{
        width: "1199px",
        margin: "auto",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url('${CERT3_BKG_IMG}')`,
        padding: "1px 5px",
        backgroundSize: "cover",
        backgroundPosition: "canter center",
        height: "909px",
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
            marginTop: "290px"
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
            marginTop: "90px",
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
            marginTop: "0px"
          }}
        >
          <div className="col-md-12">{honors}</div>
        </div>
        <div
          className="row"
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginTop: "40px"
          }}
        >
          <div className="col-md-12">{awardDate}</div>
        </div>
        <div
          className="row"
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginTop: "40px",
            maxHeight: "250px"
          }}
        >
          <div
            style={{ width: "40%", paddingRight: "25px", lineHeight: "250px" }}
          >
            <span style={{ verticalAlign: "middle", display: "inline-block", lineHeight: "1.5"}}>
              <img src={signature1} alt="" className="cert_sign" />
              <br />
              <img src={signature3} alt="" className="cert_sign" />
            </span>
          </div>
          <div style={{ width: "20%", lineHeight: "250px" }}>
            <span style={{ verticalAlign: "middle", display: "inline-block", lineHeight: "1.5"}}>
              <img src={seal} alt="" className="cert_seal" />
              <img src={seal2} alt=""  className="cert_seal" />
            </span>
          </div>
          <div style={{ width: "40%", paddingLeft: "25px", lineHeight: "250px" }}>
            <span style={{ verticalAlign: "middle", display: "inline-block", lineHeight: "1.5"}}>
              <img src={signature2} alt="" className="cert_sign" />
              <br />
              <img src={signature4} alt="" className="cert_sign" />
            </span>
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
  certificate: PropTypes.object.isRequired
};
export default Template;
