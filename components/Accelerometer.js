import { useState } from 'react';

function Accelerometer() {
    const [isRunning, setIsRunning] = useState(false);
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
        setSensorData(currentData => ({
            ...currentData,
            accelerometer: [...currentData.accelerometer,  "(x: " + x + ", y: " + y + ", z: " + z + ", time: " + time + ")"],
            gAcc: [...currentData.gAcc,  "(gx: " + x + ", gy: " + y + ", gz: " + z + ", time: " + time + ")"],
            gyroscope: [...currentData.gyroscope,  "(gyrox: " + x + ", gyroy: " + y + ", gyroz: " + z + ", time: " + time + ")"],
        }));
    };

    const handleOriEvent = (event) => {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
        const time = Date.now()
        setSensorData(currentData => ({
            ...currentData,
            orientation: [...currentData.orientation, "(alpha: " + alpha + ", beta: " + beta + ", gamma: " + gamma + ", time: " + time + ")"]
        }));
    };

    const startDemo = () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleMotionEvent);
                        window.addEventListener('deviceorientation', handleOriEvent);
                        // Add event listener for geomagnetic data if applicable
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('devicemotion', handleMotionEvent);
            window.addEventListener('deviceorientation', handleOriEvent);
            // Add event listener for geomagnetic data if applicable
        }
        setIsRunning(true);
    };

    const stopDemo = () => {
        window.removeEventListener('devicemotion', handleMotionEvent);
        window.removeEventListener('deviceorientation', handleOriEvent);
        // Remove event listener for geomagnetic data if applicable
        setIsRunning(false);

        // Send data to the server for OpenAI processing
        sendLearningDataToMockServer(sensorData);
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

    function sendLearningDataToMockServer(data) {
        fetch('https://ent61ageww28i.x.pipedream.net', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
      }

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
