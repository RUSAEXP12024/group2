function recordSensorData() {
  const deviceData = getNatureRemoData("devices");      //data取得
  const lastSensorData = getLastData("sensor");         //最終data取得

  var arg = {
    il:deviceData[0].newest_events.il.val,    //照度
  }

  setSensorData(arg, lastSensorData + 1);
}

function setSensorData(data, row) {
  getSheet('sensor').getRange(row, 1, 1, 4).setValues([[new Date(), data.il]])
}
