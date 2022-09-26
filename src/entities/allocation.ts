import { Batch } from './batch'
import { OrderLine } from './order-line'
import { OutOfStockError } from './out-of-stock-error'

export function allocate (line: OrderLine, batches: Batch[]): string {
  const allocatableBatches = batches.filter(batch => batch.canAllocate(line))
  if (allocatableBatches.length === 0) throw new OutOfStockError()

  let selectedBatch = allocatableBatches[0]
  for (const batch of allocatableBatches) {
    if (batch.eta === undefined) {
      batch.allocate(line)
      return batch.reference
    }
    if (batch.eta < selectedBatch.eta) selectedBatch = batch
  }
  selectedBatch.allocate(line)
  return selectedBatch.reference
}
