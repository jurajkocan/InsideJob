import { media, style } from "typestyle";

export const sm = 576;
export const md = 768;
export const lg = 992;
export const xl = 1200;

export const blockSpace = 24;

export const responsiveGroupBtn = (last: boolean) =>
  style(
    {
      marginRight: last ? 0 : blockSpace,
    },
    media(
      { maxWidth: md },
      {
        width: "100%",
        marginBottom: last ? 0 : blockSpace,
      }
    )
  );
