import { Batch } from './batch'
import { OrderLine } from './order-line'

export function allocate (line: OrderLine, batches: Batch[]): void {
  const allocatableBatches = batches.filter(batch => batch.canAllocate(line))
  const adequateBatch = allocatableBatches.find(batch => batch.eta === undefined)
  adequateBatch.allocate(line)
}
