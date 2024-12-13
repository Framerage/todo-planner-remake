import {FC, memo} from "react";

interface IStepBtnProps {
  btnText: string;
  onClickStepBtn: () => void;
}
//TODO: create step btn by styles
const StepBtn: FC<IStepBtnProps> = memo(({btnText, onClickStepBtn}) => {
  return (
    <button type="button" onClick={onClickStepBtn}>
      {btnText}
    </button>
  );
});
export default StepBtn;
