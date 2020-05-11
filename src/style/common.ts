import { media, style, cssRaw } from "typestyle";

export const sm = 576;
export const md = 768;
export const lg = 992;
export const xl = 1200;

export const blockSpace = 24;

export const responsiveGroupBtn = (last: boolean) =>
  style(
    {
      marginRight: last ? "0px !important" : `${blockSpace}px !important`,
    },
    media(
      { maxWidth: md },
      {
        width: "100%",
        marginBottom: last ? "0px !important" : `${blockSpace}px !important`,
      }
    )
  );

//#region I E 11 support
export const cssForIe = `
@media screen and (-ms-high-contrast: none) {
    .ant-select-single .ant-select-selector {
      display: inline-block;
    }
    .ant-input-lg {
      padding: 3px 11px !important;
    }
    .ant-col-12 {
      flex: 1 0 auto;
      display: flex;
    }
}

@-moz-document url-prefix() {
 * {
      flex: 1 0 auto !important;
    }
}
`;

//#endregion
