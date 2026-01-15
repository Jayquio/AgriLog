import type { FarmRecord, Farmer } from "@/lib/types";

export const farmRecords: FarmRecord[] = [
  {
    id: "REC001",
    cropType: "Rice",
    plantingDate: "2023-06-15",
    area: 2,
    expenses: 15000,
    inputsUsed: "Urea, Potash, Pesticide A",
    harvestQuantity: 120, // in sacks
    harvestDate: "2023-10-25",
    marketPrice: 1200, // per sack
  },
  {
    id: "REC002",
    cropType: "Corn",
    plantingDate: "2023-07-01",
    area: 1.5,
    expenses: 8000,
    inputsUsed: "Ammonium Phosphate, Herbicide B",
    harvestQuantity: 90, // in sacks
    harvestDate: "2023-10-10",
    marketPrice: 950,
  },
  {
    id: "REC003",
    cropType: "Rice",
    plantingDate: "2023-12-10",
    area: 2,
    expenses: 16500,
    inputsUsed: "Urea, Complete Fertilizer, Pesticide C",
    harvestQuantity: 130, // in sacks
    harvestDate: "2024-04-18",
    marketPrice: 1300,
  },
  {
    id: "REC004",
    cropType: "Vegetables",
    plantingDate: "2024-02-20",
    area: 0.5,
    expenses: 5000,
    inputsUsed: "Organic compost, Neem oil",
    harvestQuantity: 500, // in kg
    harvestDate: "2024-04-30",
    marketPrice: 40, // per kg
  },
  {
    id: "REC005",
    cropType: "Banana",
    plantingDate: "2023-01-15",
    area: 1,
    expenses: 12000,
    inputsUsed: "Potassium nitrate, Fungicide",
    harvestQuantity: 2000, // in kg (continuous harvest)
    harvestDate: "2024-01-01", // represents year-long
    marketPrice: 25,
  },
];

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
