import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { STATE_ENERGY_DATA } from '../constants';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// 根据消费量返回不同深浅的灰色
const getBaseColor = (consumption: number): string => {
  const min = 3000;
  const max = 6200;
  const ratio = (consumption - min) / (max - min);
  
  // 白色到浅灰渐变
  if (ratio < 0.25) return '#F5F5F5';
  if (ratio < 0.5) return '#E8E8E8';
  if (ratio < 0.75) return '#DCDCDC';
  return '#CFCFCF';
};

const USMap: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ name: string; consumption: number; x: number; y: number } | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  return (
    <div className="relative">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const stateData = Object.entries(STATE_ENERGY_DATA).find(
                ([, data]) => data.name === stateName
              );
              const consumption = stateData ? stateData[1].consumption : 4000;
              const isHovered = hoveredState === stateName;
              
              // Hover时根据消费量显示黄色深浅
              const getHoverColor = () => {
                const min = 3000;
                const max = 6200;
                const ratio = (consumption - min) / (max - min);
                // 从浅黄到深黄
                if (ratio < 0.5) return '#FFF9C4';
                if (ratio < 0.75) return '#FCFA6E';
                return '#E6E052'; // 深黄
              };

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHovered ? getHoverColor() : getBaseColor(consumption)}
                  stroke="#fff"
                  strokeWidth={0.8}
                  style={{
                    default: { outline: 'none', transition: 'fill 0.2s ease' },
                    hover: { outline: 'none', cursor: 'pointer' },
                    pressed: { outline: 'none' },
                  }}
                  onMouseEnter={(e) => {
                    setHoveredState(stateName);
                    setTooltip({
                      name: stateName,
                      consumption,
                      x: e.clientX,
                      y: e.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredState(null);
                    setTooltip(null);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && (
        <div
          className="fixed z-50 bg-[#282828] text-white px-4 py-3 rounded-lg shadow-xl pointer-events-none"
          style={{ left: tooltip.x + 10, top: tooltip.y - 60 }}
        >
          <p className="font-semibold text-[#FCFA6E]">{tooltip.name}</p>
          <p className="text-sm text-gray-300">
            {tooltip.consumption.toLocaleString()} kWh/year per capita
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {tooltip.consumption > 5250 ? 'Very High' : 
             tooltip.consumption > 4500 ? 'High' : 
             tooltip.consumption > 3750 ? 'Medium' : 'Low'} consumption
          </p>
        </div>
      )}

      <p className="text-xs text-[#9B9B9B] text-center mt-4">
        Hover over states to see consumption data
      </p>
    </div>
  );
};

export default USMap;