function getSheet(name) {
  const SPREADSHEET_ID = '1BCl00VAWVSAAorwJqXg4HynMUCrbZJc9Zs0Fj8vglK0'
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    throw new Error('シートが見つかりません');
  }

  return sheet;
}

function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;
}

