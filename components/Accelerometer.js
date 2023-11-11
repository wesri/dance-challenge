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
            <div>
                <button onClick={isRunning ? stopDemo : startDemo}>
                    {isRunning ? 'Stop Demo' : 'Start Demo'}
                </button>
            </div>
            <div>
                {data.length > 0 && (
                    <p>
                        X: {data[data.length - 1].x.toFixed(2)}, 
                        Y: {data[data.length - 1].y.toFixed(2)}, 
                        Z: {data[data.length - 1].z.toFixed(2)}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Accelerometer;
