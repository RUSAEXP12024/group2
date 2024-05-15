//ここで書かれているクラスを使うときはPulseTrackerが操作するスプレッドシートを編集してはいけない

function updateSheet(sheet_reader, queue) {
  try {

    const sheet = sheet_reader.sheet;

    if (!sheet) {
      throw new Error('指定されたシートが見つかりません');
    }

    for(let row = 0;row < queue.size();row++){
      sheet.getRange(row + 1, 1).setValue(queue[row].time); // 現在の日時を追加
      sheet.getRange(row + 1, 2).setValue(queue[row].average_heart_rate); // 平均心拍数を追加
    }

    Logger.log('Average heart rate updated successfully');
  } catch (error) {
    Logger.log('Error updating sheet: ' + error.message);
  }
}
