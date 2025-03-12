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
import Post from "@/components/Post";
import { House, MapPin } from "lucide-react";
import usePaymentPlan from "@/hooks/usePaymentPlan";


const Dashboard = () => {
  const [buildings, setBuildings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [posts, setPosts] = useState([]);

  const { logout, user, token } = useAuth();
  const navigate = useNavigate();

  const { totalAmount, paidToDate, pendingAmount, percentagePaid } = usePaymentPlan(payments);

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
    if (!token) {
      navigate('/login');
      return;
    }



    const getBuildings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/buildings/${user.building_id}`);

        const buildings = await response.json();
        setBuildings(buildings);
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    }
    getBuildings();

    const getPayments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/payments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payments = await response.json();
        const { error } = payments;
        if (error) {
          navigate('/login');
          return;
        }
        setPayments(payments);
      } catch {
        navigate('/login');
      }
    }
    getPayments();

    const getPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const posts = await response.json();
        const { error } = posts;
        if (error) {
          navigate('/login');
          return;
        }
        setPosts(posts);
      } catch {
        navigate('/login');
      }

    }
    getPosts();
  }, []);

  return token ? (
    <>
      <nav className="w-full bg-teal-900 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="font-semibold text-lg">Real State Manager</h1>
          <div className="flex gap-10 items-center">
            <p className="font-medium">{user.name}</p>
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto flex mt-6 h-full flex-1 gap-8 mb-6">
        <div className="w-2/3 p-4">
          <h2 className="text-4xl font-medium">{buildings.name}</h2>
          <div className="flex justify-between mt-2 items-center">
            <div className="flex gap-2 items-center">
              <MapPin className="size-4" />
              <span>{buildings.address}</span>
            </div>
            <div className="flex gap-2 items-center">
              <House className="size-4" />
              <span>{buildings.housing_number}</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-200 border-dashed">
            <div className=" flex justify-between items-center">
              <h3 className="text-2xl">Novedades de la comunidad</h3>
              <Button>Publicar un post</Button>
            </div>
            <div className="mt-4">
              {posts && posts
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map(post => <Post post={post} key={post._id} />)}
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-neutral-50 py-4 px-6 rounded-md">
          <h2 className="text-2xl">Resumen de pagos</h2>
          <div className="flex justify-between mt-4">
            <p className="text-sm text-neutral-600">Porcentaje pagado</p>
            <Badge variant="outline">
              {new Intl.NumberFormat("es-ES", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(percentagePaid)}
            </Badge>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-sm text-neutral-600">Total a pagar</p>
            <Badge variant="outline">
              {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(totalAmount)}
            </Badge>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-sm text-neutral-600">Pagado hasta la fecha</p>
            <Badge variant="outline">
              {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(paidToDate)}
            </Badge>
          </div>
          <div className="flex justify-between mt-4">
            <p className="text-sm text-neutral-600">Restante</p>
            <Badge variant="outline">
              {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(pendingAmount)}
            </Badge>
          </div>
          <div className="mt-4">
            {payments.length === 0 ? (
              <div className="bg-neutral-50 p-3 rounded-md mb-4 text-sm font-medium">
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
            <div className="flex flex-col gap-3">
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
  ) : null
}

export default Dashboard;