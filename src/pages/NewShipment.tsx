import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShipmentForm from '../components/forms/ShipmentForm';

export default function NewShipment() {
  const navigate = useNavigate();

  const onShipmentCreated = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Create New Shipment</h1>
      <ShipmentForm onSuccess={onShipmentCreated} />
    </div>
  );
}