export function validateShipmentData(data: any) {
  const errors: string[] = [];

  if (!data.sender?.name || !data.sender?.phone || !data.sender?.address) {
    errors.push('Sender information is incomplete');
  }

  if (!data.receiver?.name || !data.receiver?.phone || !data.receiver?.address) {
    errors.push('Receiver information is incomplete');
  }

  if (!data.cargo?.type || !data.cargo?.weight || !data.cargo?.dimensions) {
    errors.push('Cargo information is incomplete');
  }

  if (data.cargo?.weight && (isNaN(data.cargo.weight) || data.cargo.weight <= 0)) {
    errors.push('Invalid cargo weight');
  }

  return errors;
}