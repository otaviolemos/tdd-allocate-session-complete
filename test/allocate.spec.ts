import { allocate } from '../src/entities/allocation'
import { Batch } from '../src/entities/batch'
import { OrderLine } from '../src/entities/order-line'

describe('Allocation', () => {
  it('should prefer stock batches to shipments', () => {
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    const clock = 'RETRO_CLOCK'

    const inStockBatch = new Batch('in-stock-batch', clock, 100)
    const shipmentBatch = new Batch('shipment-batch', clock, 100, tomorrow)
    const line = new OrderLine('oref', clock, 10)

    allocate(line, [shipmentBatch, inStockBatch])

    expect(inStockBatch.availableQuantity).toBe(90)
    expect(shipmentBatch.availableQuantity).toBe(100)
  })
})
