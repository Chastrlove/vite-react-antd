import _ from "lodash";
import G6 from "@antv/g6";

const pattern = new RegExp("[\u4E00-\u9FA5]+"); // distinguish the Chinese charactors and letters

export const getFittingString = (str = "", maxWidth = 96, fontSize = 12, row = 3): string => {
  const ellipsis = "...";
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];

  let currentWidth = 0;

  const fixedWidth = fontSize * 1.5;

  let currentRow = 1;

  return _.chain(str)
    .split("")
    .reduce((strRes: string, letter, i) => {
      const letterWidth = pattern.test(letter)
        ? fontSize
        : G6.Util.getLetterWidth(letter, fontSize);

      currentWidth += letterWidth;

      if (currentRow <= row) {
        if (
          (currentRow === row && currentWidth >= maxWidth - fixedWidth - ellipsisLength) ||
          currentWidth > maxWidth - fixedWidth
        ) {
          currentWidth = letterWidth;
          strRes += currentRow < row ? `\n${letter}` : ellipsis;
          currentRow++;
        } else {
          strRes += letter;
        }
      }

      return strRes;
    }, "")
    .value();
};

// 获取字符串的width
const getStrLength = (str, fontSize) => {
  return _.chain(str)
    .split("")
    .reduce((num: any, letter) => {
      if (pattern.test(letter)) {
        // Chinese charactors
        num += fontSize;
      } else {
        // get the width of single letter according to the fontSize
        num += G6.Util.getLetterWidth(letter, fontSize);
      }

      return num;
    }, 0)
    .value();
};
