const usePaymentPlan = (payments) => {
  const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const paidToDate = payments
    .filter(payment => payment.status === 'Payed')
    .reduce((acc, payment) => acc + payment.amount, 0);

  const pendingAmount = payments
    .filter(payment => payment.status === 'Pending')
    .reduce((acc, payment) => acc + payment.amount, 0);

  const percentagePaid = payments.length > 0 &&
    (
      (payments.filter(payment => payment.status === 'Payed').reduce((acc, payment) => acc + payment.amount, 0) /
        payments.reduce((acc, payment) => acc + payment.amount, 0))
    ).toFixed(2);

  return {
    totalAmount,
    paidToDate,
    pendingAmount,
    percentagePaid
  }
}

export default usePaymentPlan;