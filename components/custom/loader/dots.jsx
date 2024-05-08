// https://github.com/vercel/platforms/blob/main/components/app/loading-dots.js

import styles from "./dots.module.css";

export default function Dots({ color = "#6b7280" }){
  return (
    <span className={`${styles.loading} p-2.5`}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};