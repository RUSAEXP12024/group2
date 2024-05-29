import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  NativeEventEmitter
} from "react-native";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import useHealthData from './useHealthData';
  
type ValueProps = {   // 変数型を宣言（予測）
  label: string;
  value: string;
  unit: string;
}

const Value = ({label, value, unit}: ValueProps) => (
  <View style={styles.valueContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={{ flexDirection: 'row'}}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
  </View>
)

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
    ],
    write: [],
  },
}
  
export default function App() {
  const [hasPermissions, setHasPermission] = useState(false);
  const [time, setTime] = useState(0);
  const [heartRate, setHeartRate] = useState(0);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString('ja-JP', {
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false  // 24時間制
    });
  };


  /* Permission option setting */
  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error) => {  // You can only ask once on program.
      if (error) {
        console.log("Error getting permissions");
        return;
      }
      /* Now you can read and write data */
      setHasPermission(true);
    })
  }, [])
  
  /* Background observer setting */
  useEffect(() => {
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(   // Event subscrption
      'healthKit:HeartRate:new',
      async () => {
        console.log('--> Heart rate observer triggered');
      },
    );
  }, []);


  /* Request and Fetch data */
  useEffect(() => {
    if (!hasPermissions) {
      return;
    }
    const fetchHeartRateData = () => {
      const options = {
        unit: 'bpm',  // optional
        startDate: new Date(2024, 4, 0).toISOString(),  // required
        ascending: false,
        limit: 1,
      };

      AppleHealthKit.getHeartRateSamples(
        options, (error: Object, results: Array<HealthValue>) => {
          if (error) {
            console.log("Error getting heart rate information");
          } 
          const latestSample = results[0];
          console.log('Received heart rate:', results);
          setTime(formatDate(latestSample.startDate));
          setHeartRate(latestSample.value);
        });
    };
    
    /* Set interval as 5 minutes */
    const intervalId = setInterval(fetchHeartRateData, 300000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);

  }, [hasPermissions]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Value label="Heart Rate" value={heartRate.toString()} unit="BPM" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 40,
  },
  time: {
    color: 'grey',
    fontSize: 20,
    fontWeight: '500',
  },
  valueContainer: {
    marginVertical: 20,
  },
  label: {
    color: 'red',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 20,
  },
  value: {
    fontSize: 35,
    color: 'black',
  },
  unit: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 18,
    marginLeft: 2,
  }
});