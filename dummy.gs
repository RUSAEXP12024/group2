function addConstantToRange(sheetName, rangeA1Notation, constantToAdd) {
  // スプレッドシートと範囲を取得
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('指定されたシート名が見つかりません: ' + sheetName);
  }
  const range = sheet.getRange(rangeA1Notation);

  // 範囲の現在の値を取得
  const values = range.getValues();

  // 定数を各セルに足す
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      // 数値の場合のみ定数を足す
      if (typeof values[i][j] === 'number') {
        values[i][j] += constantToAdd;
        values[i][j] = (values[i][j] / 100 | 0) * 100 + values[i][j] % 60;
      }
    }
  }

  // 更新された値を範囲に設定
  range.setValues(values);
}

function runAddConstantToRange() {
  const sheetName = 'HeartRateSheet hour'; // 変更したいシート名を指定
  const rangeA1Notation = 'A2:A13'; // 変更したい範囲を指定
  const constantToAdd = 5; // 追加したい定数を指定

  addConstantToRange(sheetName, rangeA1Notation, constantToAdd);
}

