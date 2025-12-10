export interface YearlyData {
  year: string;
  northeast: number;
  midwest: number;
  south: number;
  west: number;
  usAverage: number;
  population: number;
  totalSales: number;
  totalWaste: number;
  co2Emissions: number;
  wasteFromPhantomPower: number;
}

export interface RegionOption {
  id: string;
  label: string;
  checked: boolean;
  color: string;
}

export interface InsightData {
  title: string;
  growth: string;
  description: string;
  suggestion: string;
}