import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Icons } from './Icons';

interface MetricCardProps {
  title: string;
  value: string;
  subValue: string;
  tendency: 'up' | 'down' | 'neutral';
  data: any[];
  dataKey: string;
  color: string;
  accent?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, subValue, tendency, data, dataKey, color, accent }) => {
  return (
    <div className={`relative p-5 rounded-2xl h-40 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300 ${accent ? 'bg-[#F8F953]' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{title}</h4>
        {!accent && <div className="p-1.5 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
           <Icons.Maximize size={12} className="text-gray-400" />
        </div>}
      </div>

      <div className="flex items-end justify-between">
        <div>
           <div className="text-xs text-gray-400 mb-1">Amount</div>
           <div className="text-2xl font-bold text-gray-800">{value}</div>
        </div>
        
        <div className="w-16 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2">
         <span className="text-xs font-medium text-gray-800">{subValue}</span>
         <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
            <span className="text-[10px] text-gray-400 font-medium">Tendency</span>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
               <path d="M1 9C5 9 8 3 12 3C16 3 19 9 23 9" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            </svg>
         </div>
      </div>
    </div>
  );
};