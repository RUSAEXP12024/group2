//ここで書かれているクラスを使うときはPulseTrackerが操作するスプレッドシートを編集してはいけない

class SheetManager{
  constructor(sheet){
    this.sheet = sheet;
    this.average_heart_rates_queue = [];
  }

  updateSheet() {
    try {
      this.get_heart_rate_with_time();
      const averageHeartRate = this.getAverageHeartRate();
      
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = spreadsheet.getSheetByName('HeartRateAvarageSheet day');
      if (!sheet) {
        throw new Error('指定されたシートが見つかりません');
      }

      const lastRow = sheet.getLastRow();
      const now = new Date();
      sheet.getRange(lastRow + 1, 1).setValue(now); // 現在の日時を追加
      sheet.getRange(lastRow + 1, 2).setValue(averageHeartRate); // 平均心拍数を追加

      Logger.log('Average heart rate updated successfully');
    } catch (error) {
      Logger.log('Error updating sheet: ' + error.message);
    }

  }

  enqueue(time, avarage_heart_rate){
    
  }

  dequeue(){
    
  }
}