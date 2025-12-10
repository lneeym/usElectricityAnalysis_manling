import { YearlyData, RegionOption } from './types';

export const US_ENERGY_DATA: YearlyData[] = [
  { year: '2019', northeast: 3210, midwest: 4250, south: 5450, west: 3400, usAverage: 4420, population: 328.2, totalSales: 1468, totalWaste: 305, co2Emissions: 1775, wasteFromPhantomPower: 100 },
  { year: '2020', northeast: 3350, midwest: 4300, south: 5500, west: 3550, usAverage: 4500, population: 331.4, totalSales: 1456, totalWaste: 307, co2Emissions: 1620, wasteFromPhantomPower: 102 },
  { year: '2021', northeast: 3400, midwest: 4350, south: 5550, west: 3600, usAverage: 4580, population: 331.8, totalSales: 1471, totalWaste: 306, co2Emissions: 1650, wasteFromPhantomPower: 101 },
  { year: '2022', northeast: 3450, midwest: 4450, south: 5700, west: 3650, usAverage: 4700, population: 333.2, totalSales: 1510, totalWaste: 317, co2Emissions: 1640, wasteFromPhantomPower: 112 },
  { year: '2023', northeast: 3380, midwest: 4380, south: 5800, west: 3580, usAverage: 4650, population: 334.9, totalSales: 1476, totalWaste: 309, co2Emissions: 1532, wasteFromPhantomPower: 104 },
  { year: '2024', northeast: 3500, midwest: 4500, south: 5950, west: 3700, usAverage: 4800, population: 336.1, totalSales: 1520, totalWaste: 334, co2Emissions: 1538, wasteFromPhantomPower: 125 },
];

export const INITIAL_REGIONS: RegionOption[] = [
  { id: 'northeast', label: 'Northeast Region', checked: true, color: '#D1353A' },
  { id: 'midwest', label: 'Midwest Region', checked: true, color: '#E99940' },
  { id: 'south', label: 'South Region', checked: true, color: '#212020' },
  { id: 'west', label: 'West Region', checked: true, color: '#9CA3AF' },
];

export const COLORS = {
  // 主色调
  primary: '#FCFA6E',
  black: '#282828',
  
  // 区域色（灰色系）
  northeast: '#CFCFCF',
  midwest: '#5B5B5B', 
  south: '#282828',
  west: '#9B9B9B',
  
  // 点缀色（少量使用）
  accent: '#E99940',
  alert: '#D1353A',
  
  // 灰色系
  grayDark: '#363636',
  grayMid: '#5B5B5B',
  grayLight: '#9B9B9B',
  
  yellow: '#FCFA6E',
};

// 各州人均用电量数据 (kWh/year, 2024 estimates based on EIA data)
export const STATE_ENERGY_DATA: Record<string, { consumption: number; name: string }> = {
  AL: { consumption: 5800, name: 'Alabama' },
  AK: { consumption: 5200, name: 'Alaska' },
  AZ: { consumption: 4900, name: 'Arizona' },
  AR: { consumption: 5400, name: 'Arkansas' },
  CA: { consumption: 3100, name: 'California' },
  CO: { consumption: 3600, name: 'Colorado' },
  CT: { consumption: 3400, name: 'Connecticut' },
  DE: { consumption: 4200, name: 'Delaware' },
  FL: { consumption: 5100, name: 'Florida' },
  GA: { consumption: 5500, name: 'Georgia' },
  HI: { consumption: 3000, name: 'Hawaii' },
  ID: { consumption: 4100, name: 'Idaho' },
  IL: { consumption: 3900, name: 'Illinois' },
  IN: { consumption: 4600, name: 'Indiana' },
  IA: { consumption: 4300, name: 'Iowa' },
  KS: { consumption: 4400, name: 'Kansas' },
  KY: { consumption: 5200, name: 'Kentucky' },
  LA: { consumption: 6200, name: 'Louisiana' },
  ME: { consumption: 3100, name: 'Maine' },
  MD: { consumption: 4000, name: 'Maryland' },
  MA: { consumption: 3200, name: 'Massachusetts' },
  MI: { consumption: 3800, name: 'Michigan' },
  MN: { consumption: 3900, name: 'Minnesota' },
  MS: { consumption: 5700, name: 'Mississippi' },
  MO: { consumption: 4500, name: 'Missouri' },
  MT: { consumption: 4000, name: 'Montana' },
  NE: { consumption: 4200, name: 'Nebraska' },
  NV: { consumption: 4100, name: 'Nevada' },
  NH: { consumption: 3300, name: 'New Hampshire' },
  NJ: { consumption: 3500, name: 'New Jersey' },
  NM: { consumption: 3700, name: 'New Mexico' },
  NY: { consumption: 3000, name: 'New York' },
  NC: { consumption: 5000, name: 'North Carolina' },
  ND: { consumption: 4800, name: 'North Dakota' },
  OH: { consumption: 4200, name: 'Ohio' },
  OK: { consumption: 4700, name: 'Oklahoma' },
  OR: { consumption: 3500, name: 'Oregon' },
  PA: { consumption: 3800, name: 'Pennsylvania' },
  RI: { consumption: 3100, name: 'Rhode Island' },
  SC: { consumption: 5400, name: 'South Carolina' },
  SD: { consumption: 4400, name: 'South Dakota' },
  TN: { consumption: 5600, name: 'Tennessee' },
  TX: { consumption: 5800, name: 'Texas' },
  UT: { consumption: 3800, name: 'Utah' },
  VT: { consumption: 3000, name: 'Vermont' },
  VA: { consumption: 4500, name: 'Virginia' },
  WA: { consumption: 3600, name: 'Washington' },
  WV: { consumption: 4900, name: 'West Virginia' },
  WI: { consumption: 3700, name: 'Wisconsin' },
  WY: { consumption: 4600, name: 'Wyoming' },
  DC: { consumption: 3200, name: 'District of Columbia' },
};