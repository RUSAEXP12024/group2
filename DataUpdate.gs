function moveValuesDownA() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("sensor"); // シート名
  var columnToMove = 1;// 移動させたい列の番号
  var numRows = sheet.getLastRow();
  
  // 最下行から上に向かって処理
  for (var i = numRows; i >= 2; i--) {
    var cell = sheet.getRange(i, columnToMove);
    var value = cell.getValue();
    
    // 空セルまたは数値でない場合はスキップ
    if (value === "" || isNaN(value)) {
      continue;
    }
    
    // 下のセルに値を移動
    var targetCell = sheet.getRange(i + 1, columnToMove);
    cell.copyTo(targetCell);
    
    // 元のセルをクリア
    cell.clear();
  }
}

function moveValuesDownB() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeartRateSheet hour"); // シート名
  var columnToMove = 2;// 移動させたい列の番号
  var numRows = sheet.getLastRow();
  
  // 最下行から上に向かって処理
  for (var i = numRows; i >= 2; i--) {
    var cell = sheet.getRange(i, columnToMove);
    var value = cell.getValue();
    
    // 空セルまたは数値でない場合はスキップ
    if (value === "" || isNaN(value)) {
      continue;
    }
    
    // 下のセルに値を移動
    var targetCell = sheet.getRange(i + 1, columnToMove);
    cell.copyTo(targetCell);
    
    // 元のセルをクリア
    cell.clear();
  }
}

function clearRowValues() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("HeartRateSheet hour"); // シート名
  var rowToClear = 14; // クリアしたい行の番号
  var numColumns = sheet.getLastColumn();
  
  // 行の各セルをクリア
  for (var i = 1; i <= numColumns; i++) {
    var cell = sheet.getRange(rowToClear, i);
    cell.clear();
  }
}


function main(){
  moveValuesDownA();
  moveValuesDownB();
  clearRowValues();
}
