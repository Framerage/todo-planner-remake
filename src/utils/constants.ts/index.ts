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
export const MAIN_PATH = "/todo-planner-remake";
// export const MAIN_PATH = "";
export const CLOSE_ROUTES: {
  [key: string]: {path: string; endpoint: string; isIndex?: boolean};
} = {
  login: {
    path: `${MAIN_PATH}/login`,
    endpoint: "/login",
  },
  home: {
    path: `${MAIN_PATH}`,
    endpoint: "/",
    isIndex: true,
  },
  calendar: {
    path: `${MAIN_PATH}/dates`,
    endpoint: "/dates",
  },
  error: {
    path: `${MAIN_PATH}/*`,
    endpoint: "/error",
  },
};
export const PATHS_BASE: {
  login: string;
  calendar: string;
  error: string;
  main: string;
} = {
  login: `${MAIN_PATH}/login`,
  main: `${MAIN_PATH}`,
  calendar: `${MAIN_PATH}/dates`,
  error: `${MAIN_PATH}/error`,
};
export const PATHS_BACK: {
  taskBase: string;
  login: string;
} = {
  login: `${MAIN_PATH}/login`,
  taskBase: `${MAIN_PATH}/${localStorage.tasksBase}`,
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
