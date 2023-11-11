import { useState } from 'react';

function Accelerometer() {
    const [isRunning, setIsRunning] = useState(false);
    const [data, setData] = useState({ accel: {}, gyro: {}, mag: {} });

    const handleMotionEvent = (event) => {
        const { x, y, z } = event.acceleration;
        setData(currentData => ({ ...currentData, accel: { x, y, z } }));
    };

    const handleOrientationEvent = (event) => {
        const { alpha, beta, gamma } = event;
        setData(currentData => ({ ...currentData, gyro: { alpha, beta, gamma } }));
    };

    const handleCompassEvent = (event) => {
        // Note: This event may not provide detailed data like the others
        const { webkitCompassHeading, webkitCompassAccuracy } = event;
        setData(currentData => ({
            ...currentData,
            mag: { heading: webkitCompassHeading, accuracy: webkitCompassAccuracy }
        }));
    };

    const startDemo = () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleMotionEvent);
                        window.addEventListener('deviceorientation', handleOrientationEvent);
                        window.addEventListener('compassneedscalibration', handleCompassEvent);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('devicemotion', handleMotionEvent);
            window.addEventListener('deviceorientation', handleOrientationEvent);
            window.addEventListener('compassneedscalibration', handleCompassEvent);
        }
        setIsRunning(true);
    };

    const stopDemo = () => {
        window.removeEventListener('devicemotion', handleMotionEvent);
        window.removeEventListener('deviceorientation', handleOrientationEvent);
        window.removeEventListener('compassneedscalibration', handleCompassEvent);
        setIsRunning(false);

        // Here you can handle the collected data, like sending it to the server
        console.log(data);
    };

    return (
        <div>
            <button onClick={isRunning ? stopDemo : startDemo}>
                {isRunning ? 'Stop Demo' : 'Start Demo'}
            </button>
            <div>
                <p>Accelerometer - X: {data.accel.x?.toFixed(2)}, Y: {data.accel.y?.toFixed(2)}, Z: {data.accel.z?.toFixed(2)}</p>
                <p>Gyroscope - Alpha: {data.gyro.alpha?.toFixed(2)}, Beta: {data.gyro.beta?.toFixed(2)}, Gamma: {data.gyro.gamma?.toFixed(2)}</p>
                <p>Magnetometer - Heading: {data.mag.heading?.toFixed(2)}, Accuracy: {data.mag.accuracy?.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default Accelerometer;
