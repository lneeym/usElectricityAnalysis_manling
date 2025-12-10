import React from 'react';
import { RegionOption } from '../types';
import { Icons } from './Icons';

interface FilterPanelProps {
  regions: RegionOption[];
  onToggleRegion: (id: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ regions, onToggleRegion }) => {
  return (
    <div className="w-80 bg-white/50 border-l border-gray-100 p-6 flex flex-col h-full backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-sm text-gray-800">Choose Filters</h3>
        <button className="text-gray-400 hover:text-gray-600">
            <span className="text-xl">×</span>
        </button>
      </div>

      <div className="mb-8">
        <label className="text-xs font-bold text-gray-500 mb-2 block">Data View Mode</label>
        <div className="relative">
          <select className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#E99940]">
            <option>Per Capita (kWh)</option>
            <option>Total Sales (Billion kWh)</option>
            <option>Population Density</option>
          </select>
          <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
            <Icons.ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
         {/* Group 1 */}
         <div>
            <div className="flex items-center gap-2 mb-3 cursor-pointer group">
                <Icons.ChevronDown size={12} className="text-gray-400 group-hover:text-gray-600" />
                <span className="text-sm font-bold text-gray-800">Regions to Display</span>
            </div>
            <div className="pl-5 space-y-3">
                {regions.map(region => (
                    <label key={region.id} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${region.checked ? 'border-transparent' : 'border-gray-300'}`}
                             style={{ backgroundColor: region.checked ? region.color : 'transparent' }}>
                            {region.checked && <Icons.Check size={10} strokeWidth={4} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={region.checked} 
                            onChange={() => onToggleRegion(region.id)} 
                        />
                        <span className={`text-sm transition-colors ${region.checked ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                            {region.label}
                        </span>
                    </label>
                ))}
            </div>
         </div>

         {/* Group 2 - Cosmetic */}
         <div>
            <div className="flex items-center gap-2 mb-3 cursor-pointer opacity-60">
                <Icons.ChevronDown size={12} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-800">Comparison Data</span>
            </div>
            <div className="pl-5 space-y-2 opacity-50">
                 <div className="text-sm text-gray-400">Historical Average</div>
                 <div className="text-sm text-gray-400">Projected 2025</div>
            </div>
         </div>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500">Distribution Impact</span>
            <Icons.Maximize size={12} className="text-gray-400" />
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#D1353A]"></div>
                     <span className="text-xs text-gray-600">Cooling</span>
                  </div>
                  <span className="text-xs font-bold">65.1%</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-[#E99940]"></div>
                     <span className="text-xs text-gray-600">Heating</span>
                  </div>
                  <span className="text-xs font-bold">23.4%</span>
              </div>
              <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                     <span className="text-xs text-gray-600">Other</span>
                  </div>
                  <span className="text-xs font-bold">11.5%</span>
              </div>
              <div className="mt-3 relative h-16 w-full overflow-hidden">
                 {/* Decorative pie slice graphic */}
                 <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[#F8F953] border-4 border-white opacity-80"></div>
              </div>
          </div>
      </div>
    </div>
  );
};