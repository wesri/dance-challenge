import Accelerometer from '../components/Accelerometer';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <img src="huawei.png" height="80"></img>
        <h2 className={styles.title}>Challenge: Wednesday Dance</h2>
        <h6 className={styles.main2}>Note: this demo only works with mobile devices with accelerometer, gyroscope and orientation sensors.</h6>
        <h6 className={styles.main2}>Hold your phone on your right hand while dancing.</h6>

        <video src="https://drive.google.com/uc?export=download&id=1ZspDJy6LqsitQr6lzv5YNYmmLBlS9PyW" autoplay muted loop controls width="200" height="420"s>
          Your browser does not support the video tag.
        </video>
        <Accelerometer />
      </main>
    </div>
  );
}