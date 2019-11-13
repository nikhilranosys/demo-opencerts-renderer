import React, { FunctionComponent } from "react";
import { css } from "@emotion/core";

export const PrintWatermark: FunctionComponent = () => (
  <div
    css={css`
      @media print {
        position: absolute;
        opacity: 0.5;
        width: 100%;
        height: 100%;
        background-image: url("/images/watermark.svg");
        background-repeat: repeat;
      }
    `}
    className="print-only"
  />
);
