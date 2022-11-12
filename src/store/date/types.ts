export type DateStateProps = {
  date: {
    dateInfo: [];
    taskList: [];
    date: number;
    month: number;
    year: number;
    isTaskEdit: boolean;
    isTaskDelete: boolean;
    error: null;
  };
};
export type ActionsUserDateMonthYearProps = {type: string; payload: number};
