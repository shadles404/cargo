import React, { useState } from 'react';
import { Package, Phone, MapPin, CheckCircle, User } from 'lucide-react';
import { format } from 'date-fns';
import { updateShipmentStatus } from '../services/shipment';
import type { Shipment } from '../types';

interface ShipmentDetailsProps {
  shipment: Shipment;
  onClose: () => void;
  onStatusUpdate: () => void;
}

export default function ShipmentDetails({ shipment, onClose, onStatusUpdate }: ShipmentDetailsProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    try {
      setIsUpdating(true);
      await updateShipmentStatus(shipment.id!, 'confirmed');
      onStatusUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="h-6 w-6 text-blue-500" />
              Shipment Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Status and Date */}
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium 
                ${shipment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  shipment.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}`}>
                {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
              </span>
              <span className="text-sm text-gray-500">
                Created on {format(new Date(shipment.createdAt), 'MMM d, yyyy')}
              </span>
            </div>

            {/* Sender Details */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-500" />
                Sender Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{shipment.sender.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Phone
                  </p>
                  <p className="font-medium">{shipment.sender.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{shipment.sender.address}</p>
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-500" />
                Receiver Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{shipment.receiver.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Phone
                  </p>
                  <p className="font-medium">{shipment.receiver.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{shipment.receiver.address}</p>
                </div>
              </div>
            </div>

            {/* Cargo Details */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-blue-500" />
                Cargo Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium capitalize">{shipment.cargo.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium">{shipment.cargo.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dimensions</p>
                  <p className="font-medium">{shipment.cargo.dimensions}</p>
                </div>
                {shipment.cargo.instructions && (
                  <div>
                    <p className="text-sm text-gray-500">Special Instructions</p>
                    <p className="font-medium">{shipment.cargo.instructions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Update Button */}
            {shipment.status === 'pending' && (
              <div className="border-t pt-4">
                <button
                  onClick={handleStatusUpdate}
                  disabled={isUpdating}
                  className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  <CheckCircle className="h-5 w-5" />
                  {isUpdating ? 'Confirming...' : 'Confirm Shipment'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}