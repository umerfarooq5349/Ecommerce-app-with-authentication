import styles from "@/utils/saas/CustomLoader.module.scss";
const CustomLoader = () => {
  return (
    <div>
      <div className={styles.loader}>
        <div className={styles.circle}>
          <div className={styles.dot}></div>
          <div className={styles.outline}></div>
        </div>
        <div className={styles.circle}>
          <div className={styles.dot}></div>
          <div className={styles.outline}></div>
        </div>
        <div className={styles.circle}>
          <div className={styles.dot}></div>
          <div className={styles.outline}></div>
        </div>
        <div className={styles.circle}>
          <div className={styles.dot}></div>
          <div className={styles.outline}></div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
