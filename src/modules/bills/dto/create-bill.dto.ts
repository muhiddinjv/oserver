export class CreateBillDto {
    goods: { _id: string, name: string, price: number, quantity: number, totalPrice: number }[];
}