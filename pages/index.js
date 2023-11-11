import Accelerometer from '../components/Accelerometer';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Challenge: Wednesday Dance</h1>
        <h1 className={styles.description}>Hold your phone on your right hand.</h1>
        <video src="IMG_4720.mov" autoplay muted width="200" height="420" controls>
          Your browser does not support the video tag.
        </video>
        <Accelerometer />
      </main>
    </div>
  );
}