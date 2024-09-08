export type DateStateProps = {
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
    id: string;
    forDate: string;
  };
  error: null;
};
