import { Badge } from "@/components/ui/badge"

const PaymentsListItem = ({ payment }) => {
  const formattedDate = new Date(payment.payment_date).toISOString().split('T')[0];

  return (
    <div className="flex bg-slate-50 p-4 rounded-md gap-4 mt-2 justify-between" id={payment._id}>
      <div>
        <p>Fecha de pago:</p>
        <p>{formattedDate}</p>
      </div>
      <div>
        <p>{payment.amount}€</p>
        <Badge variant={payment.status}>{payment.status}</Badge>
      </div>
    </div>
  );
}

export default PaymentsListItem;