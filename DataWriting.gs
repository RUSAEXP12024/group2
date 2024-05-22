function writeCurrentTime() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("HeartRateSheet hour"); // シート名
  var currentTime = Utilities.formatDate(new Date(), "GMT+9", "HHmm"); // 現在の時間をHHmm形式で取得
  sheet.getRange("A2").setValue(currentTime); // A2セルに現在の時間を書き込む
}


function doPost(e){
 var JsonDATA = JSON.parse(e.postData.getDataAsString());

 writeheartrate(JsonDATA[param1]);
}



function writeheartrate(data) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("HeartRateSheet hour"); // シート名
  sheet.getRange("B2").setValue(data); // B2セルに送られてきた数値を書き込む。
}

function fiveminutes() {
  main();
  writeCurrentTime();
}


