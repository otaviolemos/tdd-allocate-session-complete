import { Batch } from './batch'
import { OrderLine } from './order-line'

export function allocate (line: OrderLine, batches: Batch[]): void {
  const allocatableBatches = batches.filter(batch => batch.canAllocate(line))
  const batchesSortedByEta = allocatableBatches.sort(compareByEta)
  const adequateBatch = batchesSortedByEta[0]
  adequateBatch.allocate(line)
}

function compareByEta (b1: Batch, b2: Batch): number {
  if (b1.eta === undefined || b1.eta < b2.eta) return -1
  if (b2.eta === undefined || b1.eta > b2.eta) return 1
  return 0
}
