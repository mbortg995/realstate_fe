import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [buildings, setBuildings] = useState([]);
  const [payments, setPayments] = useState([]);
  const { logout, user, token } = useAuth();

  useEffect(() => {
    const getBuildings = async () => {

      const response = await fetch(`http://localhost:3000/api/buildings/${user.building_id}`);

      const buildings = await response.json();
      console.log(buildings);
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
      console.log(payments);
      setPayments(payments);
    }
    getPayments();


  }, []);

  return (
    <>
      <nav className="flex justify-between items-center bg-slate-100 p-4 lg:px-12 lg:py-4">
        <div>Real State Manager</div>
        <div className="flex gap-4 items-center">
          <p>Nombre de usuario</p>
          <Button>Logout</Button>
        </div>
      </nav>
      <main className="container mx-auto flex mt-6 h-full">
        <div className="w-2/3 bg-slate-200">Contenido</div>
        <div className="w-1/3 bg-slate-400">Sidebar</div>
      </main>
    </>
  )
}

export default Dashboard;