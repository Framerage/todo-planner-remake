import {FC, memo, useState, MouseEvent} from "react";
import SearchIcon from "assets/icons/SearchIcon.png";
import {useForm} from "react-hook-form";
import tasksStore from "store/tasks.ts";

import {observer} from "mobx-react-lite";
import classes from "./styles.module.scss";
//TODO: change global variables for css

interface IProps {
  //   onCreateSearchValue: (value: string) => void;
}
const Searcher: FC<IProps> = observer(
  memo(() =>
    // {onCreateSearchValue}
    {
      const {taskSearchValue, setSearchValue} = tasksStore;
      const {handleSubmit, register} = useForm<{searchValue: string | null}>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        shouldFocusError: false,
        defaultValues: {
          searchValue: taskSearchValue,
        },
      });
      const [isSearcherActive, setIsSearcherActive] = useState(false);
      const onSearchCard = (data: {searchValue: string | null}) =>
        setSearchValue(data.searchValue || "");
      const onActiveSearcher = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSearcherActive(true);
      };
      return (
        <form
          className={classes.searcherContainer}
          onSubmit={handleSubmit(onSearchCard)}
        >
          {isSearcherActive ? (
            <>
              <input
                {...register("searchValue")}
                type="text"
                placeholder="Поиск"
                name="searchValue"
                className={classes.searcherInput}
              />
              <img
                src={SearchIcon}
                alt="SearchIcon"
                className={classes.searcherIcon}
                onClick={() => setIsSearcherActive(false)}
              />
            </>
          ) : (
            <button
              type="button"
              onClick={onActiveSearcher}
              className={classes.searcherBtn}
            >
              Search
            </button>
          )}
        </form>
      );
    },
  ),
);
export default Searcher;
