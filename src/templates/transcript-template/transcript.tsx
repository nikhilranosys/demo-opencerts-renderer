import { format } from "date-fns";
import { get } from "lodash";
import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";

import { PrintWatermark } from "../common/PrintWatermark";

import { TRANS_BKG_IMG, TRANS_BACK_IMG } from "../common/images";
import "../common/style.css";
import "../common/print.css";

export const MAX_LINES = 42;
export const TIMEZONE = "UTC";

export const renderHeader: any = (transcript: any) => {
  const id = get(transcript, "additionalData.serialNumber");
  const name = get(transcript, "recipient.name");
  const dob = get(transcript, "recipient.birthDate");
  const studentId = get(transcript, "recipient.studentId");
  const doEnrolment = format(get(transcript, "admissionDate"), "DD MMM YYYY");
  const doIssue = format(get(transcript, "issuedOn"), "DD MMM YYYY");
  const admissionDate = format(get(transcript, "admissionDate"), "DD MMM YYYY");
  const graduationDate = format(get(transcript, "attainmentDate"), "DD MMM YYYY");
  const readmit = get(transcript, "additionalData.readmitDate");
  const readmitDate = format(readmit, "DD MMM YYYY");
  const programme = get(transcript, "name");
  const programmes = get(transcript, "additionalData.additionalProgram");

  let tdProgramme = null;
  let pdob = null;
  let pid = null;
  if (id === undefined) {
    let pString = "Programme: ";

    pString += programme + " (" + admissionDate + " to " + graduationDate + ")";

    if (programmes !== undefined) {
      programmes.forEach((p: any) => {
        pString +=
          "; " +
          p.programmeName +
          " (" +
          format(p.startDate, "DD MMM YYYY") +
          " to " +
          format(p.endDate, "DD MMM YYYY") +
          ")";
      });
    }

    tdProgramme = (
      <tr>
        <td colSpan={2}>
          <p>{pString}</p>
        </td>
      </tr>
    );
  } else {
    pdob = <p>Date of Birth: {dob}</p>;
    pid = <p>Serial Number: {id}</p>;
  }

  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ width: "75%" }}>
            <p>Name: {name}</p>
            <p>
              {id === undefined ? "Date of Birth" : "Date of Enrolment"}:{" "}
              {id === undefined
                ? dob
                : doEnrolment + (readmit === undefined ? "" : " (re-admitted on: " + readmitDate + ")")}
            </p>
            {pdob}
          </td>
          <td style={{ padding: "0px 15px", width: "25%" }}>
            <p>Student ID No: {studentId}</p>
            <p>Date of Issue: {doIssue.toString()}</p>
            {pid}
          </td>
        </tr>
        {tdProgramme}
      </tbody>
    </table>
  );
};

let current = 0;
let currentPage = 0;
let keyCount = 1;

export const getTranscriptLines: any = (t: any, lCurrent: number) => {
  // 1 line for blank line and title
  let lines = 1;

  let i;
  for (i = lCurrent + 1; i < t.length; i += 1) {
    if (t[i].bold === "true" || t[i].type === 3) {
      if (t[i].type === 3) {
        lines += i - lCurrent + 7;
      } else {
        lines += i - lCurrent;
      }
      return lines;
    }
  }
  lines += 1;
  return lines;
};

export const renderTranscripts: any = (transcript: any) => {
  const table = [];
  let tLines = 0;
  let processedLines = 0;
  for (let i = current; i < transcript.length; i += 1) {
    if (transcript[i].name === "Render Format") {
      if (transcript[i].bold === "true") {
        tLines = getTranscriptLines(transcript, current);

        if (
          (i === transcript.length - 1 && tLines + processedLines > MAX_LINES) ||
          tLines + processedLines > MAX_LINES
        ) {
          break;
        }
        processedLines += tLines;

        table.push(
          <tr key={(keyCount += 1).toString()}>
            <td colSpan={5}>&nbsp;</td>
          </tr>
        );
        keyCount += 1;
        table.push(
          <tr key={(keyCount += 1).toString()}>
            <td colSpan={5}>
              <strong>{transcript[i].column1.replace(/\\/g, '"')}</strong>
            </td>
          </tr>
        );
        current += 1;
      } else if (transcript[i].type === 1) {
        if (transcript[i].column1 === "") {
          table.push(
            <tr key={(keyCount += 1).toString()}>
              <td colSpan={2}>&nbsp;</td>
              <td className="text-center" />
              <td className="text-center" />
              <td className="text-center" />
            </tr>
          );
        } else {
          if (transcript[i].tabs === 0) {
            if (transcript[i].column1 === undefined) {
              table.push(
                <tr key={(keyCount += 1).toString()}>
                  <td colSpan={5}>&nbsp;</td>
                </tr>
              );
            } else {
              table.push(
                <tr key={(keyCount += 1).toString()}>
                  <td colSpan={5}>{transcript[i].column1}</td>
                </tr>
              );
            }
          } else if (transcript[i].tabs === 1) {
            table.push(
              <tr key={(keyCount += 1).toString()}>
                <td colSpan={2}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {transcript[i].column1}
                </td>
                <td className="text-center">{transcript[i].column3}</td>
                <td className="grade-padding">{transcript[i].column4}</td>
                <td className="points-padding">{transcript[i].column5}</td>
              </tr>
            );
          } else if (transcript[i].tabs === 2) {
            table.push(
              <tr key={(keyCount += 1).toString()}>
                <td colSpan={2}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {transcript[i].column1}
                </td>
                <td className="text-center">{transcript[i].column3}</td>
                <td className="grade-padding">{transcript[i].column4}</td>
                <td className="points-padding">{transcript[i].column5}</td>
              </tr>
            );
          }
        }
      } else if (transcript[i].type === 2) {
        table.push(
          <tr key={(keyCount += 1).toString()}>
            <td>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {transcript[i].column1}
            </td>
            <td>{transcript[i].column2}</td>
            <td />
            <td />
            <td />
          </tr>
        );
      } else if (transcript[i].type === 3) {
        current = i + 1;
        break;
      } else if (transcript[i].type === 4) {
        if (transcript[i].tabs === 1) {
          table.push(
            <tr key={(keyCount += 1).toString()}>
              <td colSpan={5}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {transcript[i].column1.replace(/ /g, "\u00a0").replace(/\\/g, '"')}
              </td>
            </tr>
          );
        } else {
          table.push(
            <tr key={(keyCount += 1).toString()}>
              <td colSpan={5}>{transcript[i].column1.replace(/ /g, "\u00a0").replace(/\\/g, '"')}</td>
            </tr>
          );
        }
      }
    } else {
      table.push(
        <tr key={(keyCount += 1).toString()}>
          <td colSpan={2}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {transcript[i].name}
          </td>
          <td className="text-center">{transcript[i].overall}</td>
          <td className="grade-padding">{transcript[i].grade}</td>
          <td className="points-padding">
            {transcript[i].score}
            <sup style={{ marginLeft: "5px", fontSize: "8px" }}>{transcript[i].superscript}</sup>
          </td>
        </tr>
      );
    }

    current = i + 1;
  }

  currentPage += 1;
  processedLines = 0;

  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr style={{ padding: "0" }}>
          <th style={{ padding: "0", border: "none", width: "51%" }} />
          <th style={{ padding: "0", border: "none", width: "15%" }} />
          <th style={{ padding: "0", border: "none", width: "13%" }} />
          <th style={{ padding: "0", border: "none", width: "8%" }} />
          <th style={{ padding: "0", border: "none", width: "13%" }} />
        </tr>
        {table}
      </tbody>
    </table>
  );
};

export const printContentWithNewLine: any = (content: any) => {
  const result = [];

  if (content !== undefined) {
    content = content.replace(/ /g, "\u00a0");

    const lines = content.split(/\|\|/g);

    for (let i = 0; i < lines.length; i++) {
      result.push(lines[i]);

      if (i !== lines.length - 1) {
        result.push(<br />);
      }
    }
  }
  return result;
};

export const renderDegree: any = (footer: any) => {
  const degree = [];
  for (let i = 0; i < footer.length; i += 1) {
    const col = [];
    col.push(
      <td key={(keyCount += 1).toString()} style={{ padding: "10px", width: "50%" }}>
        <div style={{ border: "2px solid #000", padding: "5px" }}>
          <p>{printContentWithNewLine(footer[i].column1)}</p>
          <p>{printContentWithNewLine(footer[i].column3)}</p>
          <p>{printContentWithNewLine(footer[i].column4)}</p>
          <p>{footer[i].column5.replace(/ /g, "\u00a0")}</p>
        </div>
      </td>
    );
    i += 1;

    if (i < footer.length) {
      col.push(
        <td key={(keyCount += 1).toString()} style={{ padding: "10px", width: "50%" }}>
          <div style={{ border: "2px solid #000", padding: "5px" }}>
            <p>{printContentWithNewLine(footer[i].column1)}</p>
            <p>{printContentWithNewLine(footer[i].column3)}</p>
            <p>{printContentWithNewLine(footer[i].column4)}</p>
            <p>{footer[i].column5.replace(/ /g, "\u00a0")}</p>
          </div>
        </td>
      );
    }

    degree.push(
      <table key={(keyCount += 1).toString()} cellSpacing={10} style={{ width: col.length === 1 ? "50%" : "100%" }}>
        <tbody>
          <tr>{col}</tr>
        </tbody>
      </table>
    );
  }

  return degree;
};

export const renderFooterContent: any = (certificate: any) => {
  const footerContent = [];
  if (current >= certificate.transcript.length - 1) {
    const footer = certificate.transcript.filter((t: any) => t.type === 3);

    const degree = renderDegree(footer);

    footerContent.push(
      <tr key={(keyCount += 1).toString()}>
        <td style={{ padding: "15px 35px" }}>{degree}</td>
      </tr>
    );
  }

  return footerContent;
};

export const getTotalPages: any = (transcript: any) => {
  let lTotalPages = 1;
  let lProcessedLines = 0;

  for (let i = 0; i < transcript.length - 1; i += 1) {
    if (transcript[i].bold === "true") {
      const lLines = getTranscriptLines(transcript, i);

      if (
        (i === transcript.length - 1 && lLines + lProcessedLines > MAX_LINES) ||
        lLines + lProcessedLines > MAX_LINES
      ) {
        lTotalPages += 1;
        lProcessedLines = 0;
      }
      lProcessedLines += lLines;
      i += lLines - 2;
    }
  }

  return lTotalPages;
};

export const TrnascriptTemplate: FunctionComponent<TemplateProps<any>> = ({ document }) => {
  const certificate = document;

  current = 0;
  currentPage = 0;
  keyCount = 1;
  const parent = [];

  const pageCount = getTotalPages(certificate.transcript);

  while (current < certificate.transcript.length - 1) {
    parent.push(
      <div
        key={(keyCount += 1).toString()}
        className="transcript transcript-page"
        style={{
          margin: "auto",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${TRANS_BKG_IMG}')`,
          padding: "40px 30px",
          backgroundSize: "cover",
          backgroundPosition: "canter center",
          position: "relative"
        }}
      >
        <table cellSpacing={0} cellPadding={0} style={{ margin: "auto", border: "0" }}>
          <tbody>
            <tr>
              <td style={{ padding: "80px 25px 0px" }}>{renderHeader(certificate)}</td>
            </tr>
            <tr>
              <td style={{ padding: "0 15px" }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr style={{ padding: "0 10px" }}>
                      <th style={{ textAlign: "left", width: "66%" }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Course Description
                      </th>
                      <th style={{ textAlign: "center", width: "13%" }}>
                        Units
                        <br /> taken/earned
                      </th>
                      <th style={{ textAlign: "center", width: "8%" }}>grade</th>
                      <th style={{ textAlign: "center", width: "13%" }}>
                        grade points <br /> per unit
                      </th>
                    </tr>
                    <tr>
                      <td colSpan={5} style={{ padding: "0 10px" }}>
                        {renderTranscripts(certificate.transcript)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            {renderFooterContent(certificate)}
          </tbody>
        </table>
        <table style={{ width: "800px", textAlign: "center" }}>
          <tbody>
            <tr>
              <td style={{ width: "40%" }} colSpan={2}>
                <hr style={{ border: "1px solid black" }} />
              </td>
              <td style={{ width: "20%" }}>
                Page {currentPage} of {pageCount}
              </td>
              <td style={{ width: "40%" }} colSpan={2}>
                <hr style={{ border: "1px solid black" }} />
              </td>
            </tr>
            <tr>
              <td style={{ width: "20%" }} />
              <td style={{ width: "20%" }}>
                <hr style={{ border: "1px solid black" }} />
              </td>
              <td style={{ width: "20%" }}>{currentPage === pageCount ? "End of Transcript" : "Continued"}</td>
              <td style={{ width: "20%" }}>
                <hr style={{ border: "1px solid black" }} />
              </td>
              <td style={{ width: "20%" }} />
            </tr>
          </tbody>
        </table>
        <div className="transcript_seal_sign">
          <img src={certificate.additionalData.Signature1} alt="" />
          <img src={certificate.additionalData.Seal} alt="" />
        </div>
      </div>
    );
  }

  parent.push(
    <div
      key={(keyCount += 1).toString()}
      className="transcript"
      style={{
        width: "1000px",
        margin: "auto",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url('${TRANS_BACK_IMG}')`,
        marginTop: "60px",
        padding: "40px 30px",
        backgroundSize: "cover",
        backgroundPosition: "canter center",
        height: "1290px",
        position: "relative"
      }}
    />
  );

  return (
    <>
      <PrintWatermark />
      {parent}
    </>
  );
};
