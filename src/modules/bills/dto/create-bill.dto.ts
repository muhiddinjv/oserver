export class CreateBillDto {
    lineItems: { _id: string, name: string, price: number, quantity: number, totalPrice: number }[];
}