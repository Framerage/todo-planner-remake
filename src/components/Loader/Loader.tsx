import {FC} from "react";
import styles from "./styles.module.scss";

const Loader: FC<{
  loaderWidth?: number;
  loaderHeight?: number;
  dotWidth?: number;
  dotHeight?: number;
}> = ({
  loaderHeight = 300,
  loaderWidth = 300,
  dotWidth = 25,
  dotHeight = 25,
}) => {
  const dots = Array(20).fill({color: "rgba(45,85,255,0.9)"}, 0);

  const itemStyle = (index: number) => {
    return {
      transform: `rotate(calc(360deg / ${dots.length} * ${index}))`,
    };
  };
  const dotStyle = (color: string, index: number) => {
    return {
      width: `${dotWidth}px`,
      height: `${dotHeight}px`,
      backgroundColor: `${color}`,
      boxShadow: `0 0 10px ${color},0 0 20px ${color},
        0 0 40px ${color}, 0 0 50px ${color}`,
      animationDelay: `calc(0.1s * ${index})`,
    };
  };
  return (
    <div
      className={styles.dlContainer}
      style={{width: `${loaderWidth}px`, height: `${loaderHeight}px`}}
    >
      {dots.map((el, index) => (
        <div key={index} className={styles.dlItem} style={itemStyle(index)}>
          <div className={styles.dot} style={dotStyle(el.color, index)}></div>
        </div>
      ))}
    </div>
  );
};
export default Loader;
