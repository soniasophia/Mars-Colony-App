export class Report {
  date: string;
  colonist_id: string;
  atype: string;
  action: string;

  constructor(date, colonistId, atype, action) {
    this.date = date;
    this.colonist_id = colonistId;
    this.atype = atype;
    this.action = action;
  }
}
