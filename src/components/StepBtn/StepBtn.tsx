import {FC, memo} from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

interface IStepBtnProps {
  btnText: string;
  onClickStepBtn?: () => void;
  extraClass?: string;
  isDisabled?: boolean;
  btnType?: HTMLButtonElement["type"];
}

const StepBtn: FC<IStepBtnProps> = memo(
  ({btnText, onClickStepBtn, extraClass, isDisabled, btnType = "button"}) => {
    return (
      <button
        type={btnType}
        onClick={onClickStepBtn}
        className={cn(styles.stepBtn, extraClass, {
          [styles.disabledBtn]: isDisabled,
        })}
        disabled={isDisabled}
      >
        {btnText}
      </button>
    );
  },
);
export default StepBtn;
