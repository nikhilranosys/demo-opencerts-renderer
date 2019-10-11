import PropTypes from "prop-types";
import { get } from "lodash";
import React from "react";
import { tz } from "moment-timezone";

import { CERT2_BKG_IMG } from "../common/images";
import { getDegreeFontSize, getNameFontSize } from "../common/functions";
import "../common/style.scss";
import "../common/print.scss";

export const TIMEZONE = "Asia/Singapore";

const Template = ({ document }) => {
  const certificate = document;
  
  // Declaring what variables will be available to the template from the certificate
  const certificateName = get(certificate, "name");
  const recipientName = get(certificate, "recipient.name");
  const attainmentDate = get(certificate, "attainmentDate");
  const SerialNumber = get(certificate, "additionalData.SerialNumber");
  const signature1 = get(certificate, "additionalData.Signature1");
  const signature2 = get(certificate, "additionalData.Signature2");
  const signature3 = get(certificate, "additionalData.Signature3");
  const signature4 = get(certificate, "additionalData.Signature4");
  const seal = get(certificate, "additionalData.Seal");

  const awardDate = tz(attainmentDate, TIMEZONE).format("DD MMMM YYYY");

  let index = certificateName.toUpperCase().indexOf("GRADUATE DIPLOMA IN");
  let start = index + 20;
  const degreeFirstPart = certificateName.substring(0, start);
  const degreeSecondPart = certificateName.substring(start  , certificateName.length);

  let degreeName = null;

  if(index == -1)
  {
    degreeName = (<div className="col-md-12" style={{
                    fontSize: getDegreeFontSize(certificateName) + "px"
                  }}>{certificateName}</div>);
  }
  else
  {
    degreeName = (<div className="col-md-12" style={{
                    fontSize: getDegreeFontSize(degreeSecondPart) + "px"
                  }}>{degreeFirstPart}<br/>{degreeSecondPart}</div>);
  }
  
  return (
        <div
          className="transcript"
          style={{
            width: "1199px",
            margin: "auto",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('${CERT2_BKG_IMG}')`,
            padding: "1px 5px",
            backgroundSize: "cover",
            backgroundPosition: "canter center",
            height: "909px",
            position: "relative"
          }}
        >
          <div
            className="col-md-12 text-center"
            style={{ fontFamily: "sarif" }}
          >
            <div
              className="row"
              style={{
                fontSize: getNameFontSize(recipientName) + "px",
                lineHeight: "55px",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginTop: "295px"
              }}
            >
              <div className="col-md-12">{recipientName}</div>
            </div>
            <div
              className="row"
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                marginTop: "100px",
                color: "#9c9062"
              }}
            >
              {degreeName}
            </div>
            <div
              className="row"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginTop: "30px",
                maxHeight: "250px"
              }}
            >
              <div className="col-md-12"><span style={{ fontWeight: "normal" }}>on</span> {awardDate}</div>
            </div>
            <div
              className="row"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginTop: (index == -1 ? "100" : "48") + "px",
                maxHeight: "200px"
              }}
            >
              <div
                style={{
                  width: "40%",
                  paddingRight: "25px", 
                  lineHeight: "200px",
                  paddingLeft: "200px"
                }}
              >
                <span style={{ verticalAlign: "middle", display: "inline-block", lineHeight: "1.5"}}>
                  <img src={signature1} alt="" className="cert_sign" />
                  <div style={{ padding: "5px" }}></div>
                  <img src={signature3} alt="" className="cert_sign" />
                </span>
              </div>
              <div style={{ width: "20%", lineHeight: "200px" }}>
                <span style={{ verticalAlign: "middle", display: "inline-block", lineHeight: "1.5"}}>
                  <img src={seal} alt="" className="cert_seal" />
                </span>
              </div>
              <div
                style={{ width: "40%", paddingLeft: "25px", lineHeight: "200px", paddingRight: "150px" }}
              >
                <span style={{ verticalAlign: "middle", display: "inline-block", lineHeight: "1.5"}}>
                  <img src={signature2} alt="" className="cert_sign" />
                  <div style={{ padding: "5px" }}></div>
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
