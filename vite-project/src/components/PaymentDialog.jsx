import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'your-dialog-library';
import { Button, Label } from 'your-ui-library';

const PaymentDialog = ({ handleSubmitForm, handleInputChange, data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2">
          Crear pagos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmitForm}>
          <DialogHeader>
            <DialogTitle>Pagos recurrentes</DialogTitle>
            <DialogDescription>
              Crea uno o múltiples pagos
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Importe
              </Label>
              <Input
                id="amount"
                placeholder="1700"
                value={data.amount}
                name="amount"
                onChange={handleInputChange}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payment_number" className="text-right">
                Nº Pagos
              </Label>
              <Input
                id="payment_number"
                value={data.payment_number}
                name="payment_number"
                onChange={handleInputChange}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="starting_date" className="text-right">
                Fecha inicio
              </Label>
              <Input
                type="date"
                id="starting_date"
                value={data.starting_date}
                name="starting_date"
                onChange={handleInputChange}
                className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
            >
              Crear pagos
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;