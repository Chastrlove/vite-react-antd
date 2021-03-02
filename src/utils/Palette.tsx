import _ from "lodash";

export const hexToRgbA = hex => {
  if (!hex) {
    return ""
  }

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)";
  }
  throw new Error("Bad Hex");
};

const RyColor = ["#A45CE3", "#18B3FF", "#F08045", "#52C41A", "#FABF14", "#6CD3A0", "#F7A112"];

export const palette = (colorHex = _.sample(RyColor), needBorder: boolean = false) => {
  const rgba = hexToRgbA(colorHex);
  return needBorder
    ? {
      color: rgba,
      background: _.replace(rgba, ",1)", ",.15)"),
      borderColor: _.replace(rgba, ",1)", ",.45)")
    }
    : {
      color: rgba,
      background: _.replace(rgba, ",1)", ",.15)")
    };
};
