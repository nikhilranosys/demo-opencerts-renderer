import React, { FunctionComponent } from "react";
import { css } from "@emotion/core";

export const PrintWatermark: FunctionComponent = () => (
  <div
    css={css`
      width: 0;
      height: 0;
      opacity: 0;
      display: none;
      position: absolute;
      background-color: blue;
      background-repeat: repeat;

      @media print {
        width: 100%;
        height: 100%;
        opacity: 0.6;
        display: block;
      }
    `}
    className="print-only"
  />
);
