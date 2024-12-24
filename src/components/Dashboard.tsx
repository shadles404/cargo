import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { auth } from '../lib/firebase';
import { subscribeToShipments } from '../services/shipment';
import ShipmentList from './ShipmentList';
import type { Shipment } from '../types';

export default function Dashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError('Please sign in to view shipments.');
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = subscribeToShipments(
        user.uid,
        (fetchedShipments) => {
          setShipments(fetchedShipments);
          setError(null);
          setLoading(false);
        },
        (error) => {
          console.error('Error in Dashboard:', error);
          setError(error.message);
          setLoading(false);
        }
      );

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error('Error setting up subscription:', error);
      setError('Failed to load shipments. Please try again later.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Shipments</h2>
      </div>
      <ShipmentList shipments={shipments} />
    </div>
  );
}