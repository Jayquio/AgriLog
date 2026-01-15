export type FarmRecord = {
  id: string;
  cropType: string;
  plantingDate: string;
  area: number;
  expenses: number;
  inputsUsed: string;
  harvestQuantity: number;
  harvestDate: string;
  marketPrice: number; // Price per unit of harvest
};

export type FarmRecordWithProfit = FarmRecord & {
  revenue: number;
  profit: number;
};

export type Farmer = {
  id: string;
  name: string;
  farmLocation: string;
  totalArea: number;
  cropCount: number;
};
