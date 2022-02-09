import key from './dataApiKey';
import { DataAccess } from '../classes/dataAccess';
import jsonData from './staticData.json';

export default {
    staticData: <T>(k: string): T => {
        if (!(k in jsonData)) {
            return;
        } else {
            return Reflect.get(jsonData, k);
        }
    },

    // This is deprecated, will probably remove after a bit
    googleSheets: (sheet: string, customHandle?: (data: DataAccess, resolve: (value?: unknown) => void) => void): Promise<unknown> => {
        // lets do this async, build a new promise
        return new Promise((resolve, reject) => {
        // use the api key and the sheet passed in
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/14OsbtSgGtA911j16Y_QjX6P_etYEJ4sahge0iQn8mcw/values:batchGet?key=${key}&ranges=${sheet.toLowerCase()}&majorDimension=ROWS`)
        .then((resp) => {
            // make some json, this also happens async
            resp.json()
            .then((data: DataAccess) => {
                if (customHandle) {
                    customHandle(data, resolve);
                } else {
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
                }
            })
        })
        })
    }
}