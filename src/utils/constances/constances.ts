export const FULL_DAY_MSECONDS = 24 * 60 * 60 * 1000;

export const ERRORS_API = {
  400: "error with sent to server",
  500: "server not found",
  429: "too many repetitions",
  404: 'can"t found path',
};
export const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const PATHS_BASE: {
  login: string;
  calendar: string;
  error: string;
  firstPage: string;
} = {
  login: "todo-planner-remake/login",
  firstPage: "todo-planner-remake/",
  calendar: "todo-planner-remake/dates",
  error: "todo-planner-remake/error",
};
export const PATHS_BACK: {
  taskBase: string;
  login: string;
} = {
  login: "login",
  taskBase: localStorage.tasksBase,
};

export const WEEK_DAYS: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
