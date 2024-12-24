import React from 'react';
import { MapPin } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ShipmentFormData } from '../../../types';

interface ReceiverFormProps {
  register: UseFormRegister<ShipmentFormData>;
  errors: FieldErrors<ShipmentFormData>;
}

export default function ReceiverForm({ register, errors }: ReceiverFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-500" />
        Receiver Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('receiverName', { required: 'Receiver name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.receiverName && (
            <p className="mt-1 text-sm text-red-600">{errors.receiverName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            {...register('receiverPhone', { required: 'Receiver phone is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.receiverPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.receiverPhone.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            {...register('receiverAddress', { required: 'Receiver address is required' })}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.receiverAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.receiverAddress.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}