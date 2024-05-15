function Main(){ //5分毎に実行する関数
  const sheet_reader = new SheetHeartRateReader();
  const average_sheet_manager = new SheetHeartRateReader();

  sheet_reader.getSheet('HeartRateSheet hour');
  sheet_reader.getData();

  average_sheet_manager.getSheet('HeartRateAvarageSheet day');
  average_sheet_manager.getData();

  now_time = parseInt(sheet_reader.getLastData().time);
  now_hour = nowtime / 100 | 0;
  now_minute = now_time % 100;
  //ここにnow_timeから何時何分かをnow_hourとnow_minuteに入れる処理が入る
  if(0 <= now_minute < 5){
    updateSheet(sheet_reader, average_sheet_manager.heart_rate_with_time);
  }

  avarage_heart_rate_day = average_sheet_manager.getAverageHeartRate();
  const heart_rate_threshold_sleeping = 0.8 * avarage  //閾値

  if(sheet_reader.getLastData() < heart_rate_threshold_sleeping){      //寝ていることを検知したとき
    const remo_light_operation = new RemoLightOperation();
    remo_light_operation.search_signalId();
    remo_light_operation.light_off();
  }

  const remo_sensor_reader = new RemoInfoReader();
  if(sheet_reader.getLastData() > heart_rate_threshold_sleeping &&
      sheet_reader.getAverageHeartRate() < heart_rate_threshold_sleeping &&
      remo_sensor_reader.updateRemoSensorData().brightness < 20){   //寝ている最中に途中で起きたとき

    const remo_light_operation = new RemoLightOperation();
    remo_light_operation.search_signalId();
    remo_light_operation.night_light_on();
  }

}

