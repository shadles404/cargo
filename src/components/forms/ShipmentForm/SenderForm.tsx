import React from 'react';
import { User } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ShipmentFormData } from '../../../types';

interface SenderFormProps {
  register: UseFormRegister<ShipmentFormData>;
  errors: FieldErrors<ShipmentFormData>;
}

export default function SenderForm({ register, errors }: SenderFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <User className="h-5 w-5 text-blue-500" />
        Sender Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('senderName', { required: 'Sender name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.senderName && (
            <p className="mt-1 text-sm text-red-600">{errors.senderName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            {...register('senderPhone', { required: 'Sender phone is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.senderPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.senderPhone.message}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            {...register('senderAddress', { required: 'Sender address is required' })}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.senderAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.senderAddress.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}