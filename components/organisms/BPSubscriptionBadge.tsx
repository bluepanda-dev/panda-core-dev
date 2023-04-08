import BPBadge from '@components/atoms/BPBadge'
import { SIZE, UI_TYPE } from '@core/types/ui-kit'

type BPSubscriptionBadgeProps = {
  type: 'free' | 'trial' | 'plus'
  size?: SIZE
}

export default function BPSubscriptionBadge({
  type,
  size = 'xs',
}: BPSubscriptionBadgeProps) {
  let stype: UI_TYPE = 'accent'

  if (type === 'trial') {
    stype = 'caution'
  } else if (type === 'plus') {
    stype = 'primary'
  }
  return (
    <BPBadge type={stype} size={size} className="capitalize">
      {type}
    </BPBadge>
  )
}
