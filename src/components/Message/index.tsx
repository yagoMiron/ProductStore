import styles from "./styles.module.css";
import { Severity } from "../../enums/Severity";

type Props = {
  message: string;
  severity: Severity;
};

const Message = ({ message, severity }: Props) => {
  let severityStyle = styles.success;
  if (severity === Severity.WARNING) {
    severityStyle = styles.warning;
  } else if (severity === Severity.ERROR) {
    severityStyle = styles.error;
  }

  return (
    <div className={`${styles.container} ${severityStyle}`}>
      <span>{message}</span>
    </div>
  );
};

export default Message;
