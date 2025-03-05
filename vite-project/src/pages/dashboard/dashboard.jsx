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
    <p>Dashboard</p>
  )
}

export default Dashboard;