class SheetHeartRateReader {
  constructor() {
    this.heart_rate_with_time = [];
    this.average_heart_rate = null;
    this.sheet = null;
    this.data = null;//スプレッドシートからそのまま出したデータ
    this.data_length;
  }

  get_heart_rate_with_time() {

    this.getData();

    const headerRow = this.data[0];
    const TimeIndex = headerRow.indexOf('time');
    const HeartRateIndex = headerRow.indexOf('Heart Rate');

    if (TimeIndex >= 0 && HeartRateIndex >= 0) {
      for (let i = 1; i < this.data_length; i++) {
        this.add_heart_rate_with_time(this.data[i][TimeIndex], this.data[i][HeartRateIndex]);
      }
    }
  }

  getData() {
    if (this.sheet === null) {
      throw new Error('シートが選択されていません');
    }else{
      this.data = this.sheet.getDataRange().getValues();
      this.data_length = this.data.length;
    }
  }

  add_heart_rate_with_time(time, heart_rate) {
    this.heart_rate_with_time.push({ time: time, heart_rate: heart_rate });
  }

  getSheet(name = 'HeartRateData') {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    this.sheet = spreadsheet.getSheetByName(name);

    if (!this.sheet) {
      throw new Error('シートが見つかりません');
    }

    return this.sheet;
  }

  getLastData() {
    return this.heart_rate_with_time[this.data_length - 1];
  }

  getAverageHeartRate() {

    if (this.data_length > 1) {
      let sum = 0;
      for (let i = 0; i < this.data_length; i++) {
        sum += this.heart_rate_with_time[i].heart_rate;
      }
      this.average_heart_rate = sum / this.heart_rates.length;
      
      return this.average_heart_rate;

    } else {
      throw new Error('平均を出すためのデータがありません');
    }
  }
}