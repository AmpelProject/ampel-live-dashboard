// typed adaptation of https://github.com/AdvancedClimateSystems/moment-relativism
// using date-fns instead of moment

import {
  endOfDay,
  endOfHour,
  endOfMinute,
  endOfMonth,
  endOfSecond,
  endOfWeek,
  endOfYear,
  startOfHour,
  startOfMinute,
  startOfMonth,
  startOfSecond,
  startOfWeek,
  startOfYear,
} from "date-fns";
import add from "date-fns/add";
import startOfDay from "date-fns/startOfDay";

const units = {
  y: "years",
  M: "months",
  w: "weeks",
  d: "days",
  h: "hours",
  m: "minutes",
  s: "seconds",
};

type Unit = "y" | "Q" | "M" | "w" | "d" | "h" | "m" | "s";
const validUnits = ["y", "Q", "M", "w", "d", "h", "m", "s"];

const getUnit = function (str: string | undefined): Unit | undefined {
  if (str == undefined) {
    return undefined;
  } else if (validUnits.indexOf(str) >= 0) {
    return str as Unit;
  } else {
    throw new Error("Unit " + str + " is not a valid unit.");
  }
};

const getFullUnit = function (unit: Unit): string {
  switch (unit) {
    case "y":
      return "years";
    case "Q":
      return "quarter";
    case "M":
      return "months";
    case "w":
      return "weeks";
    case "d":
      return "days";
    case "h":
      return "hours";
    case "m":
      return "minutes";
    case "s":
      return "seconds";
    default:
      return "";
  }
};

const startOf = function (date: Date, unit: Unit): Date {
  switch (unit) {
    case "y":
      return startOfYear(date);
    case "M":
      return startOfMonth(date);
    case "w":
      return startOfWeek(date);
    case "d":
      return startOfDay(date);
    case "h":
      return startOfHour(date);
    case "m":
      return startOfMinute(date);
    case "s":
      return startOfSecond(date);
    default:
      return date;
  }
};

const endOf = function (date: Date, unit: Unit): Date {
  switch (unit) {
    case "y":
      return endOfYear(date);
    case "M":
      return endOfMonth(date);
    case "w":
      return endOfWeek(date);
    case "d":
      return endOfDay(date);
    case "h":
      return endOfHour(date);
    case "m":
      return endOfMinute(date);
    case "s":
      return endOfSecond(date);
    default:
      return date;
  }
};

type RoundingOp = "|" | "/";

const getRoundingOp = function (str: string): RoundingOp | undefined {
  if (str == "|" || str == "/") {
    return str as RoundingOp;
  } else {
    return undefined;
  }
};

interface Rounding {
  to?: RoundingOp;
  unit?: Unit;
}
interface Relativism {
  operator?: "+" | "-";
  amount?: number;
  unit?: Unit;
  round?: Rounding;
}

const getOperator = function (str: string): "+" | "-" | undefined {
  if (str == "+" || str == "-") {
    return str as "+" | "-";
  } else {
    return undefined;
  }
};

const buildDate = function (relativism: Relativism): Date {
  let now = new Date();

  if (relativism.operator && relativism.unit && relativism.amount) {
    now = add(now, {
      [getFullUnit(relativism.unit)]:
        relativism.operator == "-" ? -relativism.amount : relativism.amount,
    });
  }

  if (relativism.round && relativism.round.unit) {
    if (relativism.round.to === "|") {
      now = startOf(now, relativism.round.unit);
    } else if (relativism.round.to === "/") {
      now = endOf(now, relativism.round.unit);
    }
  }

  return now;
};

const regex = /([+|-])(\d+(\.\d+)?)(\w+)(([|,/])(\w+))?/;

const parseRelativism = function (str: string): Relativism {
  // If there are no subtractions, additions or rounding signs, just return
  // the current datetime as a momentjs instance.
  if (str === "now") {
    return {};
  }

  // Remove "now" from the string and parse the remaining characters.
  const rest = str.substring("now".length);

  // When the given string only has "now" and a rounding sign, don't apply
  // any subtractions or additions.
  if (rest[0] === "|" || rest[0] === "/") {
    return {
      round: {
        to: getRoundingOp(rest[0]),
        unit: getUnit(rest.substr(1)),
      },
    };
  }

  // Match the entire string and unpack the groups into logical variables.
  // Would be nice to have array unpacking here, alas.
  const matches = str.match(regex);
  if (matches) {
    return {
      operator: getOperator(matches[1]),
      amount: parseFloat(matches[2]),
      unit: getUnit(matches[4]),
      round: {
        to: getRoundingOp(matches[6]),
        unit: getUnit(matches[7]),
      },
    };
  } else {
    throw new Error("Could not parse " + str + " as relativism");
  }
};

const validateRelativism = function (str: string): boolean {
  try {
    parseRelativism(str);
    return true;
  } catch (error) {
    return false;
  }
};

export { parseRelativism, validateRelativism, buildDate };
