import { 
  addDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  onSnapshot,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Shipment } from '../types';

export async function createShipment(shipmentData: Omit<Shipment, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'shipments'), {
      ...shipmentData,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw new Error('Failed to create shipment. Please try again.');
  }
}

export function subscribeToShipments(
  userId: string, 
  onData: (shipments: Shipment[]) => void, 
  onError: (error: Error) => void
) {
  try {
    const shipmentsRef = collection(db, 'shipments');
    // Remove orderBy to avoid index requirement
    const shipmentsQuery = query(
      shipmentsRef,
      where('userId', '==', userId)
    );

    return onSnapshot(
      shipmentsQuery,
      (querySnapshot) => {
        const shipments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt)
        })) as Shipment[];
        
        // Sort locally instead
        shipments.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        onData(shipments);
      },
      (error) => {
        console.error('Firestore subscription error:', error);
        onError(new Error('Failed to load shipments. Please try again later.'));
      }
    );
  } catch (error) {
    console.error('Error setting up shipments subscription:', error);
    onError(new Error('Failed to set up shipments subscription.'));
    return () => {};
  }
}

export async function updateShipmentStatus(
  shipmentId: string, 
  status: 'confirmed' | 'in-transit' | 'delivered'
): Promise<void> {
  try {
    const shipmentRef = doc(db, 'shipments', shipmentId);
    await updateDoc(shipmentRef, {
      status: status
    });
  } catch (error) {
    console.error('Error updating shipment status:', error);
    throw new Error('Failed to update shipment status. Please try again.');
  }
}