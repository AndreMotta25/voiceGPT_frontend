import { AiOutlineLoading3Quarters } from "react-icons/ai"
import styles from './styles.module.css' 

const LoadingSpinner = () => {
    return (
      <div className={styles.container}>
          <AiOutlineLoading3Quarters size={'100%'} color="white"/>
      </div>
    )
}
  
export default LoadingSpinner