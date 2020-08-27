export class DataAccess {
  spreadsheetId: string;
  valueRanges: Array<valueRange>;
}

class valueRange {
  majorDimension: string;
  range: string;
  values: Array<Array<string>>;
}