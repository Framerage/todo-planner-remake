export type DateStateProps = {
  date: {
    dateInfo: [];
    taskList: [];
    date: number;
    month: number;
    year: number;
    isTaskEdit: boolean;
    isTaskDelete: boolean;
    isTaskPost: boolean;
    postedTask: {
      taskName: string;
      taskDescrip: string;
      isTaskDone: boolean;
      id: number;
      forDate: string;
    };
    error: null;
  };
};
export type ActionsUserDateMonthYearProps = {type: string; payload: number};
