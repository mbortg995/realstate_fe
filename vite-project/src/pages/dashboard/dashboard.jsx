import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PaymentsListItem from "@/components/PaymentsListItem";
import { Badge } from "@/components/ui/badge"
import Posts from "@/components/Posts";


const Dashboard = () => {
  const [buildings, setBuildings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [posts, setPosts] = useState([]);
  const { logout, user, token } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    amount: "",
    payment_number: "",
    starting_date: ""
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  useEffect(() => {
    const getBuildings = async () => {

      const response = await fetch(`http://localhost:3000/api/buildings/${user.building_id}`);

      const buildings = await response.json();
      setBuildings(buildings);
    }
    getBuildings();

    const getPayments = async () => {

      const response = await fetch('http://localhost:3000/api/payments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payments = await response.json();
      setPayments(payments);
    }
    getPayments();

    const getPosts = async () => {
      const response = await fetch('http://localhost:3000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const posts = await response.json();
      console.log(posts);
      setPosts(posts);
    }
    getPosts();
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center bg-slate-100 p-4 lg:px-12 lg:py-4">
        <h1>Real State Manager</h1>
        <div className="flex gap-4 items-center">
          <p>{user.name}</p>
          <Button onClick={() => {
            logout();
            navigate('/login');
          }}>Logout</Button>
        </div>
      </nav>
      <main className="container mx-auto flex mt-6 h-full flex-1 gap-8 mb-6">
        <div className="w-2/3 bg-slate-200 p-4 rounded-md">
          <div className="building-info bg-slate-100">
            <h2 className="">{buildings.name}</h2>
            <div className="flex justify-between">
              <p>{buildings.address}</p>
              <p>{buildings.housing_number}</p>
            </div>
          </div>
          <div className="posts-section pt-8">
            <div className=" flex justify-between bg-slate-100">
              <p>Novedades de la comunidad</p>
              <p>Publicar un post</p>
            </div>
            <div className="posts pt-8 ">
              <div className="post-list">
                {posts && posts
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map(post => <Posts postsInfo={post} key={post._id} />)}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-slate-400 p-4 rounded-md">
          <div className="payment-overview">
            <div className="payment-resume flex justify-between pt-1">
              <h2>Resumen de pagos</h2>
              <Badge>
                {payments.length > 0 &&
                  (
                    (payments.filter(payment => payment.status === 'Payed').reduce((acc, payment) => acc + payment.amount, 0) /
                      payments.reduce((acc, payment) => acc + payment.amount, 0)) * 100
                  ).toFixed(2)}%
              </Badge>
            </div>
            <div className="total-amount flex justify-between pt-1">
              <p>Total</p>
              <Badge>
                {payments.reduce((acc, payment) => acc + payment.amount, 0).toFixed(2)}€
              </Badge>
            </div>
            <div className="flex justify-between pt-1">
              <p>Pagado hasta la fecha</p>
              <Badge>
                {payments
                  .filter(payment => payment.status === 'Payed')
                  .reduce((acc, payment) => acc + payment.amount, 0).toFixed(2)}€
              </Badge>
            </div>
            <div className="flex justify-between pt-1">
              <p>Restante</p>
              <Badge>
                {payments
                  .filter(payment => payment.status === 'Pending')
                  .reduce((acc, payment) => acc + payment.amount, 0).toFixed(2)}€
              </Badge>
            </div>
          </div>
          <div className="payment-list pt-4">
            <h2>Plan de pagos</h2>
            {payments.length === 0 ? (
              <div className="bg-slate-50 p-3 rounded-md mb-4 text-sm font-medium">
                <p>Todavía no tienes ningún pago guardado.</p>
                <Dialog>
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
              </div>
            ) : null}
            <div className="payments-list" id="payments-list">
              {payments &&
                payments
                  .sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date))
                  .map(payment => <PaymentsListItem payment={payment} key={payment._id} />)}
              <Dialog>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;