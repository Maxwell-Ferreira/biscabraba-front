import { memo } from "react";
import styles from './styles.module.css';

function Loader ({ isLoading }) {

  return (
    <div className={styles.loader} style={isLoading ? { top: 0 } : {} }>
      <h1 className="cool-font">BISCA BRABA</h1>
    </div>
  )
}

export default memo(Loader);