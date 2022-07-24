import React, { useContext } from "react";
import { ContextApp } from "../../ContextAPI";
import "./Loadingel.css";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--theme-color);
`;
function Loadingel(props) {
  const { img, El, info, classNames, size, loader = true } = props;
  return (
    <>
      {loader ? (
        <Loader
          type="Grid"
          color="var(--theme-color)"
          height={size}
          width={size}
        />
      ) : El === "img" ? (
        <El src={img} />
      ) : (
        <El className={classNames}>{info}</El>
      )}
    </>
  );
}
export default Loadingel;
