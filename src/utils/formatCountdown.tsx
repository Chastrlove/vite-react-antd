import * as React from "react";
import { indexOf, map, padStart } from "lodash";
import { momentInit } from "./DateFormat";

export type valueType = number | string;
export type countdownValueType = valueType | Date | undefined;

export type Formatter =
  | false
  | "number"
  | "countdown"
  | ((value: valueType, config?: FormatConfig) => React.ReactNode);

export interface FormatConfig {
  formatter?: Formatter;
  decimalSeparator?: string;
  groupSeparator?: string;
  precision?: number;
  prefixCls?: string;
}

export interface CountdownFormatConfig extends FormatConfig {
  format?: string;
}

// Countdown
const timeUnits: [string, number][] = [
  ["Y", 1000 * 60 * 60 * 24 * 365], // years
  ["M", 1000 * 60 * 60 * 24 * 30], // months
  ["D", 1000 * 60 * 60 * 24], // days
  ["H", 1000 * 60 * 60], // hours
  ["m", 1000 * 60], // minutes
  ["s", 1000], // seconds
  ["S", 1], // million seconds
];

export function formatTimeStr(duration: number, format: string) {
  let leftDuration: number = duration;

  const escapeRegex = /\[[^\]]*]/g;
  const keepList: string[] = (format.match(escapeRegex) || []).map((str) => str.slice(1, -1));
  const templateText = format.replace(escapeRegex, "[]");

  const replacedText = timeUnits.reduce((current, [name, unit]) => {
    if (current.indexOf(name) !== -1) {
      const value = Math.floor(leftDuration / unit);
      leftDuration -= value * unit;
      return current.replace(new RegExp(`${name}+`, "g"), (match: string) => {
        const len = match.length;
        return padStart(value.toString(), len, "0");
      });
    }
    return current;
  }, templateText);

  let index = 0;
  return replacedText.replace(escapeRegex, () => {
    const match = keepList[index];
    index += 1;
    return match;
  });
}

export function formatTime(duration: number, format) {
  let leftDuration: number = duration;

  return map(timeUnits, ([name, unit]) => {
    const value = Math.floor(leftDuration / unit);
    if (indexOf(format, name) > -1) {
      leftDuration -= value * unit;
      return value;
    }
    return undefined;
  });
}

export function formatCount(value: countdownValueType, config) {
  if (!value) {
    return [];
  }
  const { format = [] } = config;
  const target = momentInit(value).valueOf();
  const current = Date.now();
  const diff = Math.max(target - current, 0);

  return formatTime(diff, format);
}

export function diffTime(value: countdownValueType) {
  if (!value) {
    return 0;
  }
  const target = momentInit(value).valueOf();
  const current = Date.now();
  return Math.max(target - current, 0);
}
