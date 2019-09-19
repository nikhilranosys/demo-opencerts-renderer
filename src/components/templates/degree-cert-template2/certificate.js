import PropTypes from "prop-types";
import { get } from "lodash";
import React from "react";

import { CERT2_BKG_IMG } from "../common/images";
import { getDegreeFontSize } from "../common/functions";
import "../common/style.scss";
import "../common/print.scss";

const Template = ({ document }) => {
  const certificate = document;
  
  // Declaring what variables will be available to the template from the certificate
  const certificateName = get(certificate, "name");
  const recipientName = get(certificate, "recipient.name");
  const SerialNumber = get(certificate, "additionalData.serialNumber");
  const signature1 = get(certificate, "additionalData.signature1");
  const signature2 = get(certificate, "additionalData.signature2");
  const signature3 = get(certificate, "additionalData.signature3");
  const signature4 = get(certificate, "additionalData.signature4");
  const seal = get(certificate, "additionalData.seal");

  const degreeFontSize = getDegreeFontSize(certificateName);

  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
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
                fontSize: "35px",
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
              <div className="col-md-12" style={{
                fontSize: degreeFontSize + "px"
              }}>{certificateName}</div>
            </div>
            <div
              className="row"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginTop: "150px"
              }}
            >
              <div
                style={{
                  width: "40%",
                  textAlign: "right",
                  paddingRight: "25px"
                }}
              >
                <img src={signature1} alt="" />
                <br />
                <img src={signature2} alt="" />
              </div>
              <div style={{ width: "20%" }}>
                <img src={seal} alt="" />
              </div>
              <div
                style={{ width: "40%", textAlign: "left", paddingLeft: "25px" }}
              >
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
      </div>
    </div>
  );
};

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
