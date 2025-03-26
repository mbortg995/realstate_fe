import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

const PaymentDialog = ({ onSubmit }) => {
  const { token } = useAuth();
  const [data, setData] = useState({
    amount: "",
    payment_number: "",
    starting_date: ""
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    await fetch('http://localhost:3000/api/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    setIsOpen(false);
    onSubmit();
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2">Crear pagos</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmitForm}>
          <DialogHeader>
            <DialogTitle>Pagos recurrentes</DialogTitle>
            <DialogDescription>Crea uno o múltiples pagos</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Importe</Label>
              <Input
                id="amount"
                placeholder="1700"
                value={data.amount}
                name="amount"
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payment_number" className="text-right">Nº Pagos</Label>
              <Input
                id="payment_number"
                value={data.payment_number}
                name="payment_number"
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="starting_date" className="text-right">Fecha inicio</Label>
              <Input
                type="date"
                id="starting_date"
                value={data.starting_date}
                name="starting_date"
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Crear pagos</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;