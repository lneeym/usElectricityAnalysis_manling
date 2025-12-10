import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { YearlyData, RegionOption } from '../types';

interface MainChartProps {
  data: YearlyData[];
  regions: RegionOption[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  regions: RegionOption[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, regions }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload as YearlyData;
    
    // Sort payload descending by value to show highest consumers first
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);

    return (
      <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 min-w-[240px]">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Timeline</span>
                <span className="text-base font-bold text-gray-900">{label}</span>
            </div>
             <div className="px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-[10px] font-semibold text-gray-500">kWh / capita</span>
             </div>
        </div>
        
        <div className="space-y-3">
          {sortedPayload.map((entry: any) => {
            const region = regions.find(r => r.id === entry.dataKey);
            // Fallback to name if region not found, formatted nicely to remove "Region" suffix for brevity if present
            const regionLabel = region ? region.label.replace(' Region', '') : entry.name;
            
            return (
              <div key={entry.dataKey} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-2.5 h-2.5 rounded-full shadow-sm ring-2 ring-white" 
                    style={{ backgroundColor: entry.color }} 
                  />
                  <span className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                    {regionLabel}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-800 tabular-nums">
                  {entry.value.toLocaleString()}
                </span>
              </div>
            );
          })}
          
          <div className="pt-3 mt-3 border-t border-dashed border-gray-200">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-2.5 h-2.5 rounded-full bg-gray-300 ring-2 ring-white" />
                   <span className="text-xs font-semibold text-gray-500">National Avg</span>
                </div>
                <span className="text-sm font-bold text-gray-900 tabular-nums">
                   {dataPoint.usAverage.toLocaleString()}
                </span>
             </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const MainChart: React.FC<MainChartProps> = ({ data, regions }) => {
  const activeRegions = regions.filter(r => r.checked);

  return (
    <div className="h-[400px] w-full relative">
       {/* Background Grid Lines simulation from the design */}
       <div className="absolute inset-0 flex justify-between pointer-events-none px-4">
         {[1,2,3,4,5].map(i => (
           <div key={i} className="h-full w-px bg-gray-100/50 dashed" />
         ))}
       </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Gradients for the areas */}
            {regions.map((region) => (
              <linearGradient key={region.id} id={`color-${region.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={region.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={region.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            hide={true} 
          />
          <Tooltip 
            content={<CustomTooltip regions={regions} />}
            cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.5 }}
          />

          {/* Render Areas based on active regions */}
          {activeRegions.map((region) => (
            <Area
              key={region.id}
              type="monotone"
              dataKey={region.id}
              stackId="1" 
              stroke={region.color}
              strokeWidth={2}
              fill={`url(#color-${region.id})`}
              fillOpacity={1}
              activeDot={{ r: 6, strokeWidth: 0, fill: region.color }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Floating Labels simulating the chart annotations */}
      <div className="absolute top-4 left-4 flex gap-8 text-xs font-medium text-gray-400">
         <div className="flex flex-col items-center">
            <span className="mb-1">Consumption (kWh)</span>
            <span className="text-gray-800 font-bold">4,800 Avg</span>
         </div>
      </div>
    </div>
  );
};