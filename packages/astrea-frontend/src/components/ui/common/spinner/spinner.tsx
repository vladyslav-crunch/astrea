import styles from './spinner.module.css';

const Spinner = () => (
    <div className={styles.loaderWrapper}>
        <div className={styles.loaderRing}></div>
    </div>
);

export default Spinner;
