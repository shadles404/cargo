import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Package } from 'lucide-react';
import { auth } from '../../../lib/firebase';
import { createShipment } from '../../../services/shipment';
import SenderForm from './SenderForm';
import ReceiverForm from './ReceiverForm';
import CargoForm from './CargoForm';
import type { ShipmentFormData } from '../../../types';

interface ShipmentFormProps {
  onSuccess?: () => void;
}

export default function ShipmentForm({ onSuccess }: ShipmentFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ShipmentFormData>();

  const onSubmit = async (data: ShipmentFormData) => {
    try {
      setError(null);
      setIsSubmitting(true);

      if (!auth.currentUser) {
        throw new Error('You must be signed in to create a shipment');
      }

      const shipment = {
        sender: {
          name: data.senderName,
          phone: data.senderPhone,
          address: data.senderAddress,
        },
        receiver: {
          name: data.receiverName,
          phone: data.receiverPhone,
          address: data.receiverAddress,
        },
        cargo: {
          type: data.cargoType,
          weight: parseFloat(data.weight),
          dimensions: data.dimensions,
          instructions: data.instructions,
        },
        status: 'pending' as const,
        createdAt: new Date(),
        userId: auth.currentUser.uid,
      };

      await createShipment(shipment);
      reset();
      setError(null);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Error booking shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-lg shadow-sm">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <SenderForm register={register} errors={errors} />
      <ReceiverForm register={register} errors={errors} />
      <CargoForm register={register} errors={errors} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Shipment...' : 'Create Shipment'}
      </button>
    </form>
  );
}