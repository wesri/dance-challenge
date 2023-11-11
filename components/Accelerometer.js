import { useState } from 'react';
import styles from '../styles/Home.module.css';

function Accelerometer() {
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [lastMotionCheck, setLastMotionCheck] = useState(0);
    const [lastOriCheck, setLastOriCheck] = useState(0);
    const [analysisResults, setAnalysisResults] = useState(false);
    const [sensorData, setSensorData] = useState({
        accelerometer: [],
        gAcc: [],
        gyroscope: [],
        orientation: [],

    });

    const handleMotionEvent = (event) => {
        const time = Date.now()
        const { x, y, z } = event.acceleration;
        const { gx, gy, gz } = event.accelerationIncludingGravity;
        const { gyrox, gyroy, gyroz } = event.rotationRate;
        if (lastMotionCheck + 100 < time) {
            setSensorData(currentData => ({
                ...currentData,
                accelerometer: [...currentData.accelerometer,  "(x: " + x + ", y: " + y + ", z: " + z + ", time: " + time + ")"],
                gAcc: [...currentData.gAcc,  "(gx: " + x + ", gy: " + y + ", gz: " + z + ", time: " + time + ")"],
                gyroscope: [...currentData.gyroscope,  "(gyrox: " + x + ", gyroy: " + y + ", gyroz: " + z + ", time: " + time + ")"],
            }));
            setLastMotionCheck(time)
        }
    };

    const handleOriEvent = (event) => {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
        const time = Date.now()
        if (lastOriCheck + 100 < time) {
            setSensorData(currentData => ({
                ...currentData,
                orientation: [...currentData.orientation, "(alpha: " + alpha + ", beta: " + beta + ", gamma: " + gamma + ", time: " + time + ")"]
            }));
            setLastOriCheck(time)
        }
    };

    const startDemo = () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleMotionEvent);
                        window.addEventListener('deviceorientation', handleOriEvent);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('devicemotion', handleMotionEvent);
            window.addEventListener('deviceorientation', handleOriEvent);
        }
        setIsRunning(true);
    };

    const stopDemo = () => {
        window.removeEventListener('devicemotion', handleMotionEvent);
        window.removeEventListener('deviceorientation', handleOriEvent);
        setIsRunning(false);
        setIsDone(true);

        sendLearningDataToMockServer(sensorData);
        sendDataToServer(sensorData);
    };

    const sendDataToServer = async (data) => {
        try {
            const response = await fetch('/api/gptanalysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            const analysisResultsData = await response.json();
            const analysisResultsText = await analysisResultsData.result;


            setAnalysisResults(analysisResultsText);
            
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const sendLearningDataToMockServer = async (data) => {
        try {
            const response = await fetch(process.env.LEARNING_DATA_BACKEND, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });
            const analysisResultsData = await response.json();
            const analysisResultsText = await analysisResultsData.result;
        } catch (error) {
            console.error('Error sending data to learning server:', error);
        }
      }

    return (
        <div>
            {isRunning && (
                <div className={styles.main3}>
                    Dance now! Hold your phone on your right hand.
                </div>
            )}

            {!isDone && (
            <button className={styles.button} onClick={isRunning ? stopDemo : startDemo}>
                {isRunning ? 'I am done!' : 'Start Dancing!'}
            </button>
            )}

            {analysisResults && (
                <div>
                    <h4>Your dance was <h2 className={styles.red}>{analysisResults}</h2> perfect!</h4>
                </div>
            )}

            {isDone && !analysisResults && (
                <div>
                    <p>Loading results...</p>
                </div>
            )}
        </div>
    );
}

export default Accelerometer;
