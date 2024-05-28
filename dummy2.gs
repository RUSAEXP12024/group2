function addRandomToRange(sheetName, rangeA1Notation) {
  // スプレッドシートと範囲を取得
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('指定されたシート名が見つかりません: ' + sheetName);
  }
  const range = sheet.getRange(rangeA1Notation);

  // 範囲の現在の値を取得
  const values = range.getValues();

  // ランダムな数を各セルに足す
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      // 数値の場合のみランダムな数を足す
      if (typeof values[i][j] === 'number') {
        const randomValue = Math.floor(Math.random() * 21) - 10; // -10から10のランダムな整数を生成
        values[i][j] += randomValue;
      }
    }
  }

  // 更新された値を範囲に設定
  range.setValues(values);
}

function runAddRandomToRange() {
  const sheetName = 'HeartRateSheet hour'; // 変更したいシート名を指定
  const rangeA1Notation = 'B2:B13'; // 変更したい範囲を指定

  addRandomToRange(sheetName, rangeA1Notation);
}
