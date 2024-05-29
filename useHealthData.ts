import { useEffect, useState } from 'react';

const useHealthData = () => {
  const [HeartRate, setHeartRate] = useState(0);
  const [HeartRateVar, setHeartRateVar] = useState(0);
  const [RestHeartRate, setRestHeartRate] = useState(0);

	// HealthKit implementation

  return { HeartRate, HeartRateVar, RestHeartRate };
};

export default useHealthData;