import React from 'react';
import { Package } from 'lucide-react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ShipmentFormData } from '../../../types';

const cargoTypes = ['documents', 'parcels', 'perishables', 'fragile'];

interface CargoFormProps {
  register: UseFormRegister<ShipmentFormData>;
  errors: FieldErrors<ShipmentFormData>;
}

export default function CargoForm({ register, errors }: CargoFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <Package className="h-5 w-5 text-blue-500" />
        Cargo Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            {...register('cargoType', { required: 'Cargo type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            {cargoTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.cargoType && (
            <p className="mt-1 text-sm text-red-600">{errors.cargoType.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            {...register('weight', { 
              required: 'Weight is required',
              min: { value: 0.1, message: 'Weight must be greater than 0' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dimensions (LxWxH)</label>
          <input
            {...register('dimensions', { required: 'Dimensions are required' })}
            placeholder="e.g., 30x20x15 cm"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.dimensions && (
            <p className="mt-1 text-sm text-red-600">{errors.dimensions.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
          <input
            {...register('instructions')}
            placeholder="Optional"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}