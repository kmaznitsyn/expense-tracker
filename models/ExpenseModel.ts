export class ExpenseModel {
  id: string;
  title: string;
  price: number;
  date: Date;

  constructor(id: string, title: string, price: number, date: Date) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.date = date;
  }
}
