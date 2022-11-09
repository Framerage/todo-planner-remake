import React from "react";
import "./styles.scss";

function Error() {
  return (
    <div className="errorBlock">
      <h1 style={{color: "red"}}>
        Error with authorization. Please, try again!
      </h1>
    </div>
  );
}

export default Error;
// TODO: export const Error, file index.ts export {default} from './Error'
