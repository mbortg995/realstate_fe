import { Badge } from "@/components/ui/badge"

const PaymentsListItem = ({ payment }) => {
  const formattedDate = new Date(payment.payment_date).toISOString().split('T')[0];

  return (
    <div className="flex bg-neutral-50 gap-4 justify-between items-center border-t border-dashed border-neutral-200 pt-3">
      <div>
        <p className="font-medium text-lg tabular-nums font-mono">{payment.amount}€</p>
        <p className="text-neutral-600 text-sm">{formattedDate}</p>
      </div>
      <div>
        <Badge variant={payment.status}>{payment.status}</Badge>
      </div>
    </div>
  );
}

export default PaymentsListItem;