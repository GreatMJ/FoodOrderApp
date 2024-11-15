import styles from "./Error.module.css";

const Error = ({ title, message }) => {
  return (
    <div className={styles["error-message"]}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
