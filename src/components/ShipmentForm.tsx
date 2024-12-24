// Update the form component to accept onSuccess prop
interface ShipmentFormProps {
  onSuccess?: () => void;
}

export default function ShipmentForm({ onSuccess }: ShipmentFormProps) {
  // ... existing code ...

  const onSubmit = async (data: any) => {
    try {
      setError(null);
      setIsSubmitting(true);

      if (!auth.currentUser) {
        throw new Error('You must be signed in to create a shipment');
      }

      const shipment = {
        // ... existing shipment creation code ...
      };

      await createShipment(shipment);
      reset();
      setError(null);
      onSuccess?.(); // Call onSuccess callback if provided
    } catch (err: any) {
      setError(err.message || 'Error booking shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component ...
}