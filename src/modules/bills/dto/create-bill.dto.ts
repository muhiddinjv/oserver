export class CreateBillDto {
    buyer: string;
    goods: { _id: string, name: string, price: number, quantity: number, totalPrice: number }[];
}