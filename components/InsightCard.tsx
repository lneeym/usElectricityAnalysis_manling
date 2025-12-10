import React from 'react';
import { InsightData } from '../types';

interface InsightCardProps {
  data: InsightData | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ data, isLoading, onRefresh }) => {
  return (
    <div className="absolute top-1/4 left-[20%] z-20 w-64 rounded-3xl p-6 shadow-2xl backdrop-blur-md transition-all hover:scale-105"
         style={{
           background: 'linear-gradient(135deg, #D1353A 0%, #E99940 100%)',
           boxShadow: '0 20px 40px rgba(209, 53, 58, 0.3)'
         }}>
      
      <div className="flex items-center gap-2 mb-4 text-white/90">
        <div className="p-1.5 bg-white/20 rounded-lg">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M12 2v20M2 12h20M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10z" />
           </svg>
        </div>
        <span className="text-sm font-medium tracking-wide">Insights</span>
      </div>

      {isLoading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-8 bg-white/20 rounded w-1/2"></div>
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
        </div>
      ) : data ? (
        <div className="text-white">
          <div className="text-xs opacity-80 uppercase tracking-wider mb-1">Potential Growth</div>
          <div className="text-4xl font-bold mb-3">{data.growth}</div>
          <div className="h-px bg-white/20 w-full mb-3"></div>
          <h3 className="text-lg font-semibold mb-1">{data.title}</h3>
          <p className="text-xs leading-relaxed opacity-90 mb-6">
            {data.description}
          </p>
          
          <div className="flex gap-2">
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-2 px-4 rounded-xl transition-colors">
              Later
            </button>
            <button 
              onClick={onRefresh}
              className="flex-1 bg-white text-[#D1353A] text-xs font-bold py-2 px-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {data.suggestion}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-white text-sm">No insights available.</div>
      )}
      
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden rounded-b-3xl opacity-20 pointer-events-none">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" fill="#fff"></path>
        </svg>
      </div>
    </div>
  );
};