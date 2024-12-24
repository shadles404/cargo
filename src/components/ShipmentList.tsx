import React, { useState } from 'react';
import { format } from 'date-fns';
import { Package, Truck, CheckCircle } from 'lucide-react';
import type { Shipment } from '../types';
import ShipmentDetails from './ShipmentDetails';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  'in-transit': 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
};

const statusIcons = {
  pending: Package,
  confirmed: Truck,
  'in-transit': Truck,
  delivered: CheckCircle,
};

interface ShipmentListProps {
  shipments: Shipment[];
  onShipmentUpdate?: () => void;
}

export default function ShipmentList({ shipments, onShipmentUpdate }: ShipmentListProps) {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  if (shipments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No shipments</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new shipment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shipments.map((shipment) => {
          const StatusIcon = statusIcons[shipment.status];
          return (
            <div 
              key={shipment.id} 
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedShipment(shipment)}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[shipment.status]} border flex items-center gap-1.5`}>
                  <StatusIcon className="w-4 h-4" />
                  {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500">
                  {format(new Date(shipment.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">From</h3>
                  <p className="font-medium text-gray-900">{shipment.sender.name}</p>
                  <p className="text-sm text-gray-600">{shipment.sender.phone}</p>
                </div>
                
                <div className="pb-3 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">To</h3>
                  <p className="font-medium text-gray-900">{shipment.receiver.name}</p>
                  <p className="text-sm text-gray-600">{shipment.receiver.phone}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Cargo Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Type</p>
                      <p className="font-medium text-gray-900 capitalize">{shipment.cargo.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Weight</p>
                      <p className="font-medium text-gray-900">{shipment.cargo.weight} kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedShipment && (
        <ShipmentDetails
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
          onStatusUpdate={() => {
            onShipmentUpdate?.();
            setSelectedShipment(null);
          }}
        />
      )}
    </>
  );
}