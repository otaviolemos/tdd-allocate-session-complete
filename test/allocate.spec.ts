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

  it('should prefer earlier batches', () => {
    const spoon = 'MINIMALIST_SPOON'
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    const later = new Date()
    later.setDate(new Date().getDate() + 10)

    const earliest = new Batch('speedy-batch', spoon, 100, today)
    const medium = new Batch('normal-batch', spoon, 100, tomorrow)
    const latest = new Batch('slow-batch', spoon, 100, later)
    const line = new OrderLine('oref', spoon, 10)

    allocate(line, [latest, medium, earliest])

    expect(earliest.availableQuantity).toBe(90)
    expect(medium.availableQuantity).toBe(100)
    expect(latest.availableQuantity).toBe(100)
  })

  it('should return allocated batch reference', () => {
    const tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    const clock = 'RETRO_CLOCK'

    const inStockBatch = new Batch('in-stock-batch', clock, 100)
    const shipmentBatch = new Batch('shipment-batch', clock, 100, tomorrow)
    const line = new OrderLine('oref', clock, 10)

    const ref = allocate(line, [shipmentBatch, inStockBatch])

    expect(inStockBatch.availableQuantity).toBe(90)
    expect(shipmentBatch.availableQuantity).toBe(100)
    expect(ref).toBe('in-stock-batch')
  })
})
