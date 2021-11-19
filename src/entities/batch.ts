import { OrderLine } from './order-line'

export class Batch {
  constructor (
    public reference: string,
    public sku: string,
    public quantity: number,
    public eta: Date,
    public availableQuantity: number = quantity
  ) {}

  allocate (line: OrderLine): void {
    this.availableQuantity -= line.quantity
  }

  canAllocate (line: OrderLine): boolean {
    return this.availableQuantity >= line.quantity &&
      this.sku === line.sku
  }
}
