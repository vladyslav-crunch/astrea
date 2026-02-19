import styles from "./spinner.module.css";

type SpinnerProps = {
  size?: number;
};

const Spinner = ({ size = 40 }: SpinnerProps) => (
  <div
    className={styles.loaderWrapper}
    style={{ width: `${size}px`, height: `${size}px` }}
  >
    <div
      className={styles.loaderRing}
      style={{ width: `${size - 4}px`, height: `${size - 4}px` }}
    ></div>
  </div>
);

export default Spinner;
