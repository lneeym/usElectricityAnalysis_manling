import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { US_ENERGY_DATA, INITIAL_REGIONS, COLORS } from './constants';
import { RegionOption } from './types';
import { MainChart } from './components/MainChart';
import { Icons } from './components/Icons';
import USMap from './components/USMap';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, Legend, AreaChart, Area, CartesianGrid 
} from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [regions] = React.useState<RegionOption[]>(INITIAL_REGIONS);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        yPercent: 30,
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray('.fade-section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const latestData = US_ENERGY_DATA[US_ENERGY_DATA.length - 1];
  const totalSales = latestData.totalSales;
  const avgConsumption = latestData.usAverage;
  const population = latestData.population;
  const totalWaste = latestData.totalWaste;
  const co2Emissions = latestData.co2Emissions;
  const phantomPower = latestData.wasteFromPhantomPower;

  const tdLosses = totalWaste - phantomPower;
  const householdsCouldPower = Math.round((totalWaste * 1000) / 12.194);
  const wastePercentage = ((totalWaste / (totalSales + totalWaste)) * 100).toFixed(1);

  // ========== CHART DATA ==========
  
  const regionalComparisonData = [
    { region: 'South', value: latestData.south, color: '#FCFA6E' },      // 黄色 - 最高
    { region: 'Midwest', value: latestData.midwest, color: '#5B5B5B' },  // 深灰
    { region: 'West', value: latestData.west, color: '#9B9B9B' },        // 中灰
    { region: 'Northeast', value: latestData.northeast, color: '#CFCFCF' }, // 浅灰
  ];

  const wasteBreakdownData = [
    { name: 'Transmission Lines', value: 120, color: '#D1353A' },
    { name: 'Distribution Networks', value: 89, color: '#E99940' },
    { name: 'Standby Electronics', value: 65, color: '#9B9B9B' },
    { name: 'Vampire Appliances', value: 40, color: '#282828' },
    { name: 'Inefficient HVAC', value: 20, color: '#FCFA6E' },
  ];

  const perCapitaTrendData = US_ENERGY_DATA.map(d => ({
    year: d.year,
    south: d.south,
    midwest: d.midwest,
    west: d.west,
    northeast: d.northeast,
    average: d.usAverage,
  }));

  const wastePieData = [
    { name: 'T&D Losses', value: tdLosses, color: '#282828' },      // 黑色
    { name: 'Phantom Power', value: phantomPower, color: '#FCFA6E' } // 黄色
  ];

  const co2BarData = US_ENERGY_DATA.map(d => ({
    year: d.year,
    co2: d.co2Emissions,
    waste: Math.round((d.totalWaste * 823.1) / 1000)
  }));

  // ========== TOOLTIPS ==========
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#282828] px-4 py-3 rounded-lg shadow-lg border border-[#FCFA6E]">
          <p className="text-sm font-semibold text-[#FCFA6E]">{payload[0].name}</p>
          <p className="text-sm text-white">{payload[0].value} billion kWh</p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#282828] px-4 py-3 rounded-lg shadow-lg border border-[#FCFA6E]">
          <p className="text-sm font-semibold text-[#FCFA6E] mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-white">
              {entry.name}: {entry.value.toLocaleString()} kWh
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-[#282828]">
      
      {/* ==================== HERO (FIXED) ==================== */}
      <section 
        ref={heroRef}
        className="h-screen flex flex-col items-center justify-center fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <p className="text-[#9B9B9B] text-sm uppercase tracking-[0.3em] mb-6">
            A Data Story About American Energy
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Power We
            <span className="block text-[#FCFA6E]">Never Use</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto mb-12">
            Every year, the United States loses <span className="text-[#FCFA6E] font-semibold">334 billion kilowatt-hours</span> of electricity to waste — enough to power 27 million homes for an entire year.
          </p>
          
          {/* Author & Date */}
          <div className="flex items-center justify-center gap-3 text-[#9B9B9B] text-sm">
            <span>By Manling Yang</span>
            <span className="w-1 h-1 rounded-full bg-[#5B5B5B]" />
            <span>December 2025</span>
          </div>
        </div>
      </section>

      <div className="h-screen" />

      {/* ==================== THE QUESTION ==================== */}
      <section className="fade-section py-24 px-8 bg-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#D1353A]/10 text-[#D1353A] text-sm font-medium rounded-full mb-6">
            The Core Question
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#282828] mb-8 leading-tight">
            Where does all the electricity go<br />before it ever reaches your home?
          </h2>
          <p className="text-lg text-[#5B5B5B] leading-relaxed mb-8">
            From the moment electricity leaves a power plant to the moment it powers your devices, 
            a significant portion simply <span className="text-[#D1353A] font-semibold">disappears</span>. 
            It's lost in transmission lines, wasted by devices that never truly turn off, 
            and consumed by an infrastructure built for a different era.
          </p>
          <p className="text-lg text-[#5B5B5B] leading-relaxed">
            This project explores <span className="font-semibold text-[#282828]">three fundamental questions</span>: 
            How much energy are we actually wasting? Where exactly is it going? 
            And what does this invisible loss mean for our climate and our wallets?
          </p>
        </div>
      </section>

      {/* ==================== VISUAL BREAK: TRANSMISSION ==================== */}
      <section 
        className="h-[60vh] relative flex items-center justify-center z-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-8 max-w-3xl">
          <p className="text-5xl md:text-6xl font-bold text-white leading-tight">
            <span className="text-[#FCFA6E]">5%</span> of all electricity
          </p>
          <p className="text-2xl text-gray-200 mt-4">
            is lost before it even reaches your neighborhood
          </p>
        </div>
      </section>

      {/* ==================== DATA OVERVIEW ==================== */}
      <section className="fade-section py-20 px-8 bg-[#F3F4F6] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#363636] text-white text-sm font-medium rounded-full mb-4">
              2024 Snapshot
            </span>
            <h2 className="text-3xl font-bold text-[#282828] mb-4">The Numbers at a Glance</h2>
            <p className="text-[#5B5B5B] max-w-2xl mx-auto">
              A high-level view of U.S. residential electricity consumption, waste, and environmental impact.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-[#282828] text-white rounded-2xl p-5">
              <div className="text-xs text-[#9B9B9B] uppercase tracking-wide mb-2">Per Capita Avg</div>
              <div className="text-3xl font-bold text-[#FCFA6E]">{avgConsumption.toLocaleString()}</div>
              <div className="text-sm text-[#9B9B9B]">kWh / year</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="text-xs text-[#5B5B5B] uppercase tracking-wide mb-2">Total Sales</div>
              <div className="text-3xl font-bold text-[#D1353A]">{(totalSales/1000).toFixed(2)}T</div>
              <div className="text-sm text-[#5B5B5B]">Terawatt-hours</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="text-xs text-[#5B5B5B] uppercase tracking-wide mb-2">Population</div>
              <div className="text-3xl font-bold text-[#E99940]">{population}M</div>
              <div className="text-sm text-[#5B5B5B]">Americans</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="text-xs text-[#5B5B5B] uppercase tracking-wide mb-2">Waste Rate</div>
              <div className="text-3xl font-bold text-[#282828]">{wastePercentage}%</div>
              <div className="text-sm text-[#5B5B5B]">Of generation lost</div>
            </div>
          </div>

          {/* Regional Trends Chart */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-[#282828] mb-2">Regional Consumption Trends</h3>
            <p className="text-[#5B5B5B] mb-6">Per capita electricity usage across four U.S. regions (2019–2024)</p>
            <MainChart data={US_ENERGY_DATA} regions={regions} />
            <p className="text-sm text-[#9B9B9B] mt-4 text-center italic">
              The South consistently leads in consumption — largely driven by air conditioning demand.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== REGIONAL COMPARISON ==================== */}
      <section className="fade-section py-20 px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-[#E99940]/10 text-[#E99940] text-sm font-medium rounded-full mb-6">
                Regional Insight
              </span>
              <h2 className="text-3xl font-bold text-[#282828] mb-6">Why Does the South Use So Much More?</h2>
              <div className="text-[#5B5B5B] leading-relaxed space-y-4">
                <p>
                  If you've ever experienced a summer in Houston or Atlanta, you already know the answer: 
                  <span className="font-semibold text-[#282828]"> air conditioning</span>.
                </p>
                <p>
                  The South's hot, humid climate drives electricity demand to levels far beyond other regions. 
                  While a Northeastern household uses around <span className="text-[#D1353A] font-semibold">3,500 kWh</span> per year, 
                  the average Southern home consumes nearly <span className="text-[#D1353A] font-semibold">6,000 kWh</span> — 
                  over <span className="font-semibold text-[#282828]">70% more</span>.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6">
              <h4 className="text-sm font-semibold text-[#363636] mb-4">2024 Per Capita Consumption by Region</h4>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={regionalComparisonData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 12, fill: '#5B5B5B' }} axisLine={{ stroke: '#E5E7EB' }} />
                  <YAxis type="category" dataKey="region" tick={{ fontSize: 12, fill: '#5B5B5B' }} axisLine={{ stroke: '#E5E7EB' }} width={80} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} kWh`, 'Per Capita']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {regionalComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== US MAP HEATMAP ==================== */}
      <section className="fade-section py-20 px-8 bg-[#F3F4F6] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-[#D1353A]/10 text-[#D1353A] text-sm font-medium rounded-full mb-4">
              Geographic Distribution
            </span>
            <h2 className="text-3xl font-bold text-[#282828] mb-4">Consumption Across America</h2>
            <p className="text-[#5B5B5B] max-w-2xl mx-auto">
              Per capita residential electricity consumption varies dramatically by state. 
              Southern states consistently rank highest due to air conditioning demand.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <USMap />
            <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-[#D1353A]">Louisiana</div>
                <div className="text-sm text-[#5B5B5B]">Highest: 6,200 kWh/year</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-[#363636]">National Avg</div>
                <div className="text-sm text-[#5B5B5B]">~4,800 kWh/year</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">Hawaii</div>
                <div className="text-sm text-[#5B5B5B]">Lowest: 3,000 kWh/year</div>
              </div>
            </div>
            <p className="text-xs text-[#9B9B9B] text-center mt-6 italic">
              Data based on EIA State Energy Data System (SEDS). Hover over states to see details.
            </p>
          </div>
        </div>
      </section>

  {/* ==================== PER CAPITA AREA CHART ==================== */}
<section className="fade-section py-20 px-8 bg-white relative z-10">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10">
      <span className="inline-block px-4 py-1 bg-[#282828] text-white text-sm font-medium rounded-full mb-4">
        Historical Trends
      </span>
      <h2 className="text-3xl font-bold text-[#282828] mb-4">Per Capita Consumption Over Time</h2>
      <p className="text-[#5B5B5B] max-w-2xl mx-auto">
        How electricity usage per person has evolved across regions from 2019 to 2024.
      </p>
    </div>

    <div className="bg-gray-50 rounded-3xl p-8">
      <ResponsiveContainer width="100%" height={400}>
  <AreaChart data={perCapitaTrendData}>
    <defs>
      <linearGradient id="colorSouth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#FCFA6E" stopOpacity={0.4}/>
        <stop offset="95%" stopColor="#FCFA6E" stopOpacity={0.05}/>
      </linearGradient>
      <linearGradient id="colorMidwest" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#282828" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="#282828" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorWest" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#5B5B5B" stopOpacity={0.2}/>
        <stop offset="95%" stopColor="#5B5B5B" stopOpacity={0}/>
      </linearGradient>
      <linearGradient id="colorNortheast" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#9B9B9B" stopOpacity={0.2}/>
        <stop offset="95%" stopColor="#9B9B9B" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#5B5B5B' }} axisLine={{ stroke: '#E5E7EB' }} />
    <YAxis tick={{ fontSize: 12, fill: '#5B5B5B' }} axisLine={{ stroke: '#E5E7EB' }} domain={[2500, 6500]} />
    <Tooltip content={<CustomTooltip />} />
    <Legend />
    <Area type="monotone" dataKey="south" name="South" stroke="#FCFA6E" fill="url(#colorSouth)" strokeWidth={3} />
    <Area type="monotone" dataKey="midwest" name="Midwest" stroke="#282828" fill="url(#colorMidwest)" strokeWidth={2} />
    <Area type="monotone" dataKey="west" name="West" stroke="#5B5B5B" fill="url(#colorWest)" strokeWidth={2} />
    <Area type="monotone" dataKey="northeast" name="Northeast" stroke="#9B9B9B" fill="url(#colorNortheast)" strokeWidth={2} />
  </AreaChart>
</ResponsiveContainer>
      <p className="text-sm text-[#9B9B9B] mt-4 text-center italic">
        The South (darkest) consistently leads — other regions follow similar gradual increases.
      </p>
    </div>
  </div>
</section>

      {/* ==================== YEAR-BY-YEAR ANALYSIS ==================== */}
      <section className="fade-section py-20 px-8 bg-[#F3F4F6] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#E99940]/10 text-[#E99940] text-sm font-medium rounded-full mb-4">
              What Shaped These Numbers?
            </span>
            <h2 className="text-3xl font-bold text-[#282828] mb-4">The Forces Behind the Data</h2>
            <p className="text-[#5B5B5B] max-w-2xl mx-auto">
              Electricity consumption doesn't happen in a vacuum. Economic shifts, extreme weather, 
              and global events all leave their fingerprints on the grid.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-8">
            
            {/* 2019 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2">
                <div 
                  className="h-64 md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80)' }}
                />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#D1353A]">2019</span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Peak Emissions</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#282828] mb-3">The Last "Normal" Year</h3>
                  <p className="text-[#5B5B5B] leading-relaxed mb-4">
                    With unemployment at historic lows and economic activity at full throttle, 2019 saw the highest 
                    electricity-related CO₂ emissions in our dataset: <span className="font-semibold text-[#D1353A]">1,775 million metric tons</span>.
                  </p>
                  <p className="text-[#5B5B5B] leading-relaxed">
                    Commercial buildings ran at full capacity, manufacturing hummed along, and coal still generated 23% of U.S. electricity.
                  </p>
                  <div className="mt-4 flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#282828]">1,775</div>
                      <div className="text-xs text-[#9B9B9B]">MMT CO₂</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#282828]">3.5%</div>
                      <div className="text-xs text-[#9B9B9B]">Unemployment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2020 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2">
                <div className="p-8 order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#9B9B9B]">2020</span>
                    <span className="px-3 py-1 bg-gray-100 text-[#363636] text-xs font-medium rounded-full">The Pandemic Shift</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#282828] mb-3">When the World Stopped — And Started Working From Home</h3>
                  <p className="text-[#5B5B5B] leading-relaxed mb-4">
                    COVID-19 fundamentally altered how we consumed electricity. Commercial demand plummeted as offices emptied, 
                    but residential consumption surged as millions set up home offices.
                  </p>
                  <p className="text-[#5B5B5B] leading-relaxed">
                    The net effect? A <span className="font-semibold text-[#282828]">9% drop in emissions</span> to 1,620 MMT — 
                    the largest single-year decline in decades.
                  </p>
                  <div className="mt-4 flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">-9%</div>
                      <div className="text-xs text-[#9B9B9B]">CO₂ Drop</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#E99940]">+3%</div>
                      <div className="text-xs text-[#9B9B9B]">Home Usage</div>
                    </div>
                  </div>
                </div>
                <div 
                  className="h-64 md:h-auto bg-cover bg-center order-1 md:order-2"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1584931423298-c576fda54bd2?auto=format&fit=crop&w=800&q=80)' }}
                />
              </div>
            </div>

            {/* 2023 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2">
                <div 
                  className="h-64 md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80)' }}
                />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-green-600">2023</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Lowest Emissions</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#282828] mb-3">The Renewable Tipping Point</h3>
                  <p className="text-[#5B5B5B] leading-relaxed mb-4">
                    2023 marked a milestone: emissions dropped to <span className="font-semibold text-green-600">1,532 MMT</span> — 
                    the lowest in our dataset — even as the economy fully recovered.
                  </p>
                  <p className="text-[#5B5B5B] leading-relaxed">
                    Wind and solar combined to generate over 16% of U.S. electricity, while coal dropped below 17%.
                  </p>
                  <div className="mt-4 flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">1,532</div>
                      <div className="text-xs text-[#9B9B9B]">MMT CO₂</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#E99940]">16%</div>
                      <div className="text-xs text-[#9B9B9B]">Wind + Solar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2024 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2">
                <div className="p-8 order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#E99940]">2024</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Warning Signs</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#282828] mb-3">A Hot Summer and Growing Demand</h3>
                  <p className="text-[#5B5B5B] leading-relaxed mb-4">
                    2024 brought a slight uptick. Emissions rose to <span className="font-semibold text-[#E99940]">1,538 MMT</span>, 
                    and per-capita consumption hit its highest point: 4,800 kWh.
                  </p>
                  <p className="text-[#5B5B5B] leading-relaxed">
                    An unusually hot summer drove record air conditioning demand. Meanwhile, AI boom and data center expansion 
                    added new loads to the grid.
                  </p>
                  <div className="mt-4 flex gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#D1353A]">4,800</div>
                      <div className="text-xs text-[#9B9B9B]">kWh/capita</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#E99940]">+8%</div>
                      <div className="text-xs text-[#9B9B9B]">Waste Increase</div>
                    </div>
                  </div>
                </div>
                <div 
                  className="h-64 md:h-auto bg-cover bg-center order-1 md:order-2"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80)' }}
                />
              </div>
            </div>

          </div>

          {/* Summary */}
          <div className="mt-12 bg-gradient-to-r from-[#282828] to-[#363636] rounded-3xl p-8 text-white text-center">
            <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
              "The data tells a complex story: progress on emissions is real, but rising temperatures 
              and new technologies are pushing consumption higher. 
              <span className="text-[#FCFA6E] font-semibold"> The race between clean energy and growing demand is far from over.</span>"
            </p>
          </div>
        </div>
      </section>

      {/* ==================== VISUAL BREAK: PHANTOM POWER ==================== */}
      <section 
        className="h-[50vh] relative flex items-center justify-center z-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative z-10 px-8 max-w-4xl">
          <p className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Your TV is <span className="text-[#D1353A]">never really off.</span>
          </p>
          <p className="text-xl text-gray-300">
            The average American home has 65 devices consuming power 24/7, even when "turned off."
          </p>
        </div>
      </section>

      {/* ==================== THE HIDDEN COST ==================== */}
      <section className="fade-section py-20 px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-1 bg-[#D1353A]/10 text-[#D1353A] text-sm font-medium rounded-full mb-6">
              Deep Dive
            </span>
            <h2 className="text-3xl font-bold text-[#282828] mb-4">The Hidden Cost of Power</h2>
            <p className="text-lg text-[#5B5B5B] leading-relaxed">
              Every year, the United States wastes <span className="font-semibold text-[#D1353A]">{totalWaste} billion kWh</span> of 
              electricity — enough to power <span className="font-semibold text-[#282828]">{householdsCouldPower.toLocaleString()} million homes</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 rounded-3xl p-8">
              <h3 className="text-lg font-semibold text-[#282828] mb-6">Waste by Category</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={wastePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {wastePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 flex-1 border border-red-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 flex-shrink-0">
                    <Icons.Grid size={20} className="text-[#D1353A]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#5B5B5B] mb-1">Transmission & Distribution</div>
                    <div className="text-3xl font-bold text-[#D1353A]">{tdLosses} billion kWh</div>
                    <p className="text-sm text-[#5B5B5B] mt-2">
                      Lost as heat in power lines traveling hundreds of miles.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 flex-1 border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-orange-100 flex-shrink-0">
                    <Icons.Home size={20} className="text-[#E99940]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#5B5B5B] mb-1">Phantom Power (Standby)</div>
                    <div className="text-3xl font-bold text-[#E99940]">{phantomPower} billion kWh</div>
                    <p className="text-sm text-[#5B5B5B] mt-2">
                      Devices "off" but still plugged in — costing $100–$200/year per home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Waste Breakdown */}
          <div className="bg-gray-50 rounded-3xl p-8">
            <h3 className="text-lg font-semibold text-[#282828] mb-2">Detailed Waste Breakdown</h3>
            <p className="text-sm text-[#5B5B5B] mb-6">Where exactly is the {totalWaste} billion kWh going?</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5B5B5B' }} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis tick={{ fontSize: 12, fill: '#5B5B5B' }} axisLine={{ stroke: '#E5E7EB' }} />
                <Tooltip 
                  formatter={(value: number) => [`${value} billion kWh`, 'Annual Waste']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {wasteBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ==================== ENVIRONMENTAL TOLL ==================== */}
      <section className="fade-section py-20 px-8 bg-[#F3F4F6] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-6">
              Environmental Impact
            </span>
            <h2 className="text-3xl font-bold text-[#282828] mb-4">The Environmental Toll</h2>
            <p className="text-lg text-[#5B5B5B] leading-relaxed">
              Wasted electricity isn't just an economic problem — it's an environmental crisis. 
              Every kilowatt-hour lost means fossil fuels burned for nothing.
            </p>
          </div>

       {/* CO2 Area Chart */}
<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
  <h3 className="text-lg font-semibold text-[#282828] mb-2">U.S. Electricity Emissions (2019–2024)</h3>
  <p className="text-sm text-[#5B5B5B] mb-6">Tracking total emissions and the portion from wasted power</p>
  <ResponsiveContainer width="100%" height={320}>
    <AreaChart data={co2BarData}>
      <defs>
        <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#282828" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#282828" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorWasteCo2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FCFA6E" stopOpacity={0.5}/>
          <stop offset="95%" stopColor="#FCFA6E" stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
      <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#5B5B5B' }} axisLine={{ stroke: '#E5E7EB' }} />
      <YAxis tick={{ fontSize: 12, fill: '#5B5B5B' }} axisLine={{ stroke: '#E5E7EB' }} domain={[0, 2000]} />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: '#282828', 
          border: '1px solid #FCFA6E',
          borderRadius: '8px',
          color: '#fff'
        }}
        labelStyle={{ color: '#FCFA6E', fontWeight: 600 }}
        itemStyle={{ color: '#fff' }}
        formatter={(value: number, name: string) => [
          `${value} MMT CO₂`, 
          name === 'co2' ? 'Total Emissions' : 'From Waste'
        ]}
      />
      <Legend />
      <Area 
        type="monotone" 
        dataKey="co2" 
        name="Total Electricity CO₂"
        stroke="#282828" 
        fill="url(#colorCo2)" 
        strokeWidth={3}
        dot={{ fill: '#282828', strokeWidth: 2, r: 4 }}
      />
      <Area 
        type="monotone" 
        dataKey="waste" 
        name="CO₂ from Wasted Power"
        stroke="#FCFA6E" 
        fill="url(#colorWasteCo2)" 
        strokeWidth={3}
        dot={{ fill: '#FCFA6E', stroke: '#282828', strokeWidth: 2, r: 4 }}
      />
    </AreaChart>
  </ResponsiveContainer>
</div>

          {/* Impact Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="text-xs font-medium text-[#5B5B5B] uppercase tracking-wide mb-2">2024 Total CO₂</div>
              <div className="text-3xl font-bold text-[#282828]">{co2Emissions}</div>
              <div className="text-sm text-[#5B5B5B]">Million Metric Tons</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 border border-orange-200">
              <div className="text-xs font-medium text-[#5B5B5B] uppercase tracking-wide mb-2">CO₂ from Waste</div>
              <div className="text-3xl font-bold text-[#E99940]">~121</div>
              <div className="text-sm text-[#5B5B5B]">Million Metric Tons</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="text-xs font-medium text-[#5B5B5B] uppercase tracking-wide mb-2">Equivalent to</div>
              <div className="text-3xl font-bold text-[#282828]">28M</div>
              <div className="text-sm text-[#5B5B5B]">cars removed/year</div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <div className="text-xs font-medium text-[#5B5B5B] uppercase tracking-wide mb-2">Trees to Offset</div>
              <div className="text-3xl font-bold text-[#282828]">2.0B</div>
              <div className="text-sm text-[#5B5B5B]">trees planted</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VISUAL BREAK: FUTURE ==================== */}
      <section 
        className="h-[50vh] relative flex items-center justify-center z-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 text-center px-8 max-w-3xl">
          <p className="text-4xl md:text-5xl font-bold text-white leading-tight">
            What if we could <span className="text-[#FCFA6E]">recapture</span> this waste?
          </p>
        </div>
      </section>

      {/* ==================== CONCLUSION ==================== */}
      <section className="fade-section py-24 px-8 bg-[#282828] text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">A Future Worth Fighting For</h2>
          <div className="text-lg text-[#9B9B9B] leading-relaxed space-y-6 mb-12">
            <p>
              If America's grid operated at perfect efficiency — if every device in our homes 
              drew zero standby power — the <span className="text-[#FCFA6E] font-semibold">{totalWaste} billion kWh</span> we 
              waste could power <span className="text-[#FCFA6E] font-semibold">{householdsCouldPower.toLocaleString()} million households</span>.
            </p>
            <p>
              Eliminating this waste would prevent <span className="text-[#D1353A] font-semibold">121 million metric tons of CO₂</span> from 
              entering our atmosphere — equivalent to removing <span className="font-semibold text-white">28 million cars</span> from American roads.
            </p>
          </div>

          {/* Action Items */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#D1353A]/20 flex items-center justify-center mx-auto mb-4">
                <Icons.Home size={24} className="text-[#D1353A]" />
              </div>
              <h3 className="font-semibold mb-2">Unplug Idle Devices</h3>
              <p className="text-sm text-[#9B9B9B]">Use smart power strips to eliminate phantom power in your home.</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#E99940]/20 flex items-center justify-center mx-auto mb-4">
                <Icons.Grid size={24} className="text-[#E99940]" />
              </div>
              <h3 className="font-semibold mb-2">Support Grid Modernization</h3>
              <p className="text-sm text-[#9B9B9B]">Advocate for smart grid investments that reduce transmission losses.</p>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#FCFA6E]/20 flex items-center justify-center mx-auto mb-4">
                <Icons.Insights size={24} className="text-[#FCFA6E]" />
              </div>
              <h3 className="font-semibold mb-2">Stay Informed</h3>
              <p className="text-sm text-[#9B9B9B]">Understand your energy footprint and make data-driven decisions.</p>
            </div>
          </div>

          {/* Data Sources */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-[#5B5B5B] uppercase tracking-wide mb-4">Data Sources & References</p>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-6">
              <a href="https://www.eia.gov/electricity/data.php" target="_blank" rel="noopener noreferrer" 
                 className="text-sm text-[#9B9B9B] hover:text-[#FCFA6E] transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D1353A]" />
                U.S. Energy Information Administration (EIA)
              </a>
              <a href="https://www.epa.gov/egrid" target="_blank" rel="noopener noreferrer"
                 className="text-sm text-[#9B9B9B] hover:text-[#FCFA6E] transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E99940]" />
                EPA eGRID Database
              </a>
              <a href="https://www.nrdc.org/resources/home-idle-load" target="_blank" rel="noopener noreferrer"
                 className="text-sm text-[#9B9B9B] hover:text-[#FCFA6E] transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B9B9B]" />
                Natural Resources Defense Council (NRDC)
              </a>
              <a href="https://eta.lbl.gov/publications/home-idle-load-devices-wasting" target="_blank" rel="noopener noreferrer"
                 className="text-sm text-[#9B9B9B] hover:text-[#FCFA6E] transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCFA6E]" />
                Lawrence Berkeley National Laboratory
              </a>
              <a href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator" target="_blank" rel="noopener noreferrer"
                 className="text-sm text-[#9B9B9B] hover:text-[#FCFA6E] transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                EPA GHG Equivalencies Calculator
              </a>
              <a href="https://www.census.gov/popclock/" target="_blank" rel="noopener noreferrer"
                 className="text-sm text-[#9B9B9B] hover:text-[#FCFA6E] transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                U.S. Census Bureau Population Data
              </a>
            </div>
            <p className="text-xs text-[#5B5B5B]">Data Period: 2019–2024 · Last Updated: December 2025</p>
            <p className="text-xs text-[#5B5B5B] mt-2">NYU IMA Data Visualization · Fall 2025</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default App;