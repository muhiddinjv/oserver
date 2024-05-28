export class CreateBillDto {
    buyer: string;
    goods: { _id: string, title: string, price: number, quantity: number, totalPrice: number }[];
}