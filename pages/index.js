import Accelerometer from '../components/Accelerometer';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Accelerometer Data Collector</h1>
        <Accelerometer />
      </main>
    </div>
  );
}