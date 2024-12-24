export interface Shipment {
  id?: string;
  sender: {
    name: string;
    phone: string;
    address: string;
  };
  receiver: {
    name: string;
    phone: string;
    address: string;
  };
  cargo: {
    type: string;
    weight: number;
    dimensions: string;
    instructions?: string;
  };
  status: 'pending' | 'confirmed' | 'in-transit' | 'delivered';
  createdAt: Date;
  userId: string;
}

export interface ShipmentFormData {
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  cargoType: string;
  weight: string;
  dimensions: string;
  instructions?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}