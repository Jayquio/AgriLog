import type { Farmer } from "@/lib/types";

// This file now only contains mock data for the admin farmer directory.
// All farm records are now managed in Firestore.

export const farmers: Farmer[] = [
  {
    id: 'FARM01',
    name: 'Juan Dela Cruz',
    farmLocation: 'Nueva Ecija',
    totalArea: 5.5,
    cropCount: 3,
  },
  {
    id: 'FARM02',
    name: 'Maria Santos',
    farmLocation: 'Isabela',
    totalArea: 3,
    cropCount: 2,
  },
  {
    id: 'FARM03',
    name: 'Jose Rizal',
    farmLocation: 'Laguna',
    totalArea: 2,
    cropCount: 2,
  },
  {
    id: 'FARM04',
    name: 'Andres Bonifacio',
    farmLocation: 'Tarlac',
    totalArea: 10,
    cropCount: 4,
  },
];