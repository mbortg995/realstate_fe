import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PaymentsListItem from "@/components/PaymentsListItem";
import { Badge } from "@/components/ui/badge"
import Post from "@/components/Post";
import { House, MapPin } from "lucide-react";
import usePaymentPlan from "@/hooks/usePaymentPlan";
import PaymentDialog from "@/components/PaymentDialog";

const Dashboard = () => {
  const [buildings, setBuildings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [posts, setPosts] = useState([]);

  const { logout, user, token } = useAuth();
  const navigate = useNavigate();

  const { totalAmount, paidToDate, pendingAmount, percentagePaid } = usePaymentPlan(payments);

  const navigateLogin = () => {
    navigate('/login');
    return;
  }
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
        navigateLogin();
        return;
      }
      setPayments(payments);
    } catch {
      navigateLogin();
    }
  }

  useEffect(() => {
    if (!token) {
      navigateLogin();
    }

    const getBuildings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/buildings/${user.building_id}`);

        const buildings = await response.json();
        setBuildings(buildings);
      } catch {
        navigateLogin();
      }
    }
    getBuildings();

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
          navigateLogin();
          return;
        }
        setPosts(posts);
      } catch {
        navigateLogin();
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
                <PaymentDialog onSubmit={getPayments} />
              </div>
            ) : null}
            <div className="flex flex-col gap-3">
              {payments &&
                payments
                  .sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date))
                  .map(payment => <PaymentsListItem payment={payment} key={payment._id} />)}
              <PaymentDialog onSubmit={getPayments} />
            </div>
          </div>
        </div>
      </main>
    </>
  ) : null
}

export default Dashboard;