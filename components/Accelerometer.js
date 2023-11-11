import { useState } from 'react';

function Accelerometer() {
    const [isRunning, setIsRunning] = useState(false);
    const [data, setData] = useState([]);

    const handleMotionEvent = (event) => {
        const { x, y, z } = event.acceleration;
        setData(currentData => [...currentData, { x, y, z }]);
    };

    const startDemo = () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleMotionEvent);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('devicemotion', handleMotionEvent);
        }
        setIsRunning(true);
    };

    const stopDemo = () => {
        window.removeEventListener('devicemotion', handleMotionEvent);
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
                {data.map((datum, index) => (
                    <p key={index}>X: {datum.x}, Y: {datum.y}, Z: {datum.z}</p>
                ))}
            </div>
        </div>
    );
}

export default Accelerometer;
