function getNatureRemoData(endpoint) {
  const REMO_ACCESS_TOKEN = 'ZlJ0_GC7OZTsNqfe37kK2j6w6xVdrAKuAJXQFE6GMj0._0ZHTIAL4Fkaqn4siMFOGT3V2VaRUzrXOhtP82HKmVg'
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "get",
    "headers" : headers,
  };

  return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
}

