import key from './dataApiKey';
import { DataAccess } from '../classes/dataAccess';

export default {
  googleSheets: (sheet: string) => {
    // lets do this async, build a new promise
    return new Promise((resolve, reject) => {
      // use the api key and the sheet passed in
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/14OsbtSgGtA911j16Y_QjX6P_etYEJ4sahge0iQn8mcw/values:batchGet?key=${key}&ranges=${sheet.toLowerCase()}&majorDimension=ROWS`)
      .then((resp) => {
        // make some json, this also happens async
        resp.json()
        .then((data: DataAccess) => {
          // build our object to return
          const valueObjects = data.valueRanges.reduce((acc, vr) => {
            return vr.values.reduce((result: any, data) => {
              if (data.length) {
                result[data[0]] = data.slice(1)
                return result;
              }
            }, acc)
          }, {})
          // resolve with some awesome data from google sheets
          resolve(valueObjects)
        })
      })
    })
  }
}