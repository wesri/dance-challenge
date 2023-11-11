import { useState } from 'react';

function Accelerometer() {
    const [isRunning, setIsRunning] = useState(false);
    const [analysisResults, setAnalysisResults] = useState(false);
    const [sensorData, setSensorData] = useState({
        accelerometer: [],
        gyroscope: [],
    });

    const handleMotionEvent = (event) => {
        const { x, y, z } = event.acceleration;
        setSensorData(currentData => ({
            ...currentData,
            accelerometer: [...currentData.accelerometer,  "(x: " + x + ", y: " + y +", z: " + z + "), "]
        }));
    };

    const handleGyroEvent = (event) => {
        const { alpha, beta, gamma } = event.rotationRate;
        setSensorData(currentData => ({
            ...currentData,
            gyroscope: [...currentData.gyroscope, [ alpha, beta, gamma ]]
        }));
    };

    const startDemo = () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleMotionEvent);
                        window.addEventListener('deviceorientation', handleGyroEvent);
                        // Add event listener for geomagnetic data if applicable
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('devicemotion', handleMotionEvent);
            window.addEventListener('deviceorientation', handleGyroEvent);
            // Add event listener for geomagnetic data if applicable
        }
        setIsRunning(true);
    };

    const stopDemo = () => {
        window.removeEventListener('devicemotion', handleMotionEvent);
        window.removeEventListener('deviceorientation', handleGyroEvent);
        // Remove event listener for geomagnetic data if applicable
        setIsRunning(false);

        // Send data to the server for OpenAI processing
        sendDataToServer(sensorData);
    };

    const sendDataToServer = async (data) => {
        console.log(data)
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
            // Handle the analysis results here
            console.log(analysisResultsText);
            setAnalysisResults(analysisResultsText);
            
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    return (
        <div>
            <button onClick={isRunning ? stopDemo : startDemo}>
                {isRunning ? 'Stop Demo' : 'Start Demo'}
            </button>
            {isRunning && (
                <div>
                    <p>Collecting data...</p>
                </div>
            )}
            {analysisResults && (
                <div>
                    <p>{analysisResults}</p>
                </div>
            )}
        </div>
    );
}

export default Accelerometer;
