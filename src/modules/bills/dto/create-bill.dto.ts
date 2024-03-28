export class CreateBillDto {
    readonly items: { id: string, quantity: number }[];
}