// import { useState, useEffect } from 'react';

// export default function PokemonLevelCalculator() {
//   const baseStats = {
//     "ABOMASNOW": [178, 158, 207],
//     "ABRA": [195, 82, 93],
//     "ABSOL": [246, 120, 163],
//     "ACCELGOR": [220, 120, 190],
//     "AERODACTYL": [221, 159, 190],
//     "AGGRON": [198, 257, 172],
//     "AIPOM": [136, 112, 146],
//     "ALAKAZAM": [271, 167, 146],
//     "ALTARIA": [141, 201, 181],
//     "AMPHAROS": [211, 169, 207],
//     "ARCANINE": [227, 166, 207],
//     "CHARIZARD": [223, 173, 186],
//     "MEWTWO": [300, 182, 214],
//     "PIKACHU": [112, 96, 111]
//   };

//   const [pokemonData, setPokemonData] = useState({
//     species: "CHARIZARD",
//     cp: 2145,
//     attackIV: 13,
//     defenseIV: 11,
//     staminaIV: 14
//   });

//   const [calculatedLevel, setCalculatedLevel] = useState(0);
//   const [levelScalar, setLevelScalar] = useState(0);
//   const [arcValue, setArcValue] = useState(1);
//   const [predictionText, setPredictionText] = useState("");

//   const cpMults = {
//     1: 0.094, 1.5: 0.1351374318, 2: 0.16639787, 2.5: 0.192650919, 3: 0.21573247,
//     3.5: 0.2365726613, 4: 0.25572005, 4.5: 0.2735303812, 5: 0.29024988,
//     5.5: 0.3060573775, 6: 0.3210876, 6.5: 0.3354450362, 7: 0.34921268,
//     7.5: 0.3624577511, 8: 0.3752356, 8.5: 0.387592416, 9: 0.39956728,
//     9.5: 0.4111935514, 10: 0.4225, 10.5: 0.4329264091, 11: 0.44310755,
//     11.5: 0.4530599591, 12: 0.4627984, 12.5: 0.472336093, 13: 0.48168495,
//     13.5: 0.4908558003, 14: 0.49985844, 14.5: 0.508701765, 15: 0.51739395,
//     15.5: 0.5259425113, 16: 0.5343543, 16.5: 0.5426357375, 17: 0.5507927,
//     17.5: 0.5588305862, 18: 0.5667545, 18.5: 0.5745691333, 19: 0.5822789,
//     19.5: 0.5898879072, 20: 0.5974, 20.5: 0.6048236651, 21: 0.6121573,
//     21.5: 0.6194041216, 22: 0.6265671, 22.5: 0.6336491432, 23: 0.64065295,
//     23.5: 0.6475809666, 24: 0.65443563, 24.5: 0.6612192524, 25: 0.667934,
//     25.5: 0.6745818959, 26: 0.6811649, 26.5: 0.6876849038, 27: 0.69414365,
//     27.5: 0.70054287, 28: 0.7068842, 28.5: 0.7131691091, 29: 0.7193991,
//     29.5: 0.7255756136, 30: 0.7317, 30.5: 0.7347410093, 31: 0.7377695,
//     31.5: 0.7407855938, 32: 0.74378943, 32.5: 0.7467812109, 33: 0.74976104,
//     33.5: 0.7527290867, 34: 0.7556855, 34.5: 0.7586303683, 35: 0.76156384,
//     35.5: 0.7644860647, 36: 0.76739717, 36.5: 0.7702972656, 37: 0.7731865,
//     37.5: 0.7760649616, 38: 0.77893275, 38.5: 0.7817900548, 39: 0.784637,
//     39.5: 0.7874736075, 40: 0.7903, 40.5: 0.792803968, 41: 0.79530001,
//     41.5: 0.797800015, 42: 0.8003, 42.5: 0.802799995, 43: 0.8053,
//     43.5: 0.8078, 44: 0.81029999, 44.5: 0.812799985, 45: 0.81529999,
//     45.5: 0.81779999, 46: 0.82029999, 46.5: 0.82279999, 47: 0.82529999,
//     47.5: 0.82779999, 48: 0.83029999, 48.5: 0.83279999, 49: 0.83529999,
//     49.5: 0.83779999, 50: 0.84029999, 50.5: 0.84279999, 51: 0.84529999
//   };

//   const samplePokemon = [
//     {
//       species: "PIKACHU",
//       cp: 652,
//       attackIV: 10,
//       defenseIV: 12,
//       staminaIV: 8
//     },
//     {
//       species: "CHARIZARD",
//       cp: 2145,
//       attackIV: 13,
//       defenseIV: 11,
//       staminaIV: 14
//     },
//     {
//       species: "MEWTWO",
//       cp: 3901,
//       attackIV: 15,
//       defenseIV: 15,
//       staminaIV: 15
//     }
//   ];

//   const calculateLevelScalar = () => {
//     const { species, cp, attackIV, defenseIV, staminaIV } = pokemonData;
//     const speciesStats = baseStats[species];
//     if (!speciesStats) {
//       setPredictionText("Species not found in database");
//       return 0;
//     }

//     const [baseAttack, baseDefense, baseStamina] = speciesStats;
//     const atk = baseAttack + attackIV;
//     const def = Math.sqrt(baseDefense + defenseIV);
//     const stam = Math.sqrt(baseStamina + staminaIV);
//     const scalar = Math.sqrt((cp * 10) / (atk * def * stam));
//     return scalar;
//   };

//   const findClosestLevel = (scalar) => {
//     let closestLevel = 1;
//     let smallestDifference = Infinity;
//     for (const [level, mult] of Object.entries(cpMults)) {
//       const difference = Math.abs(mult - scalar);
//       if (difference < smallestDifference) {
//         smallestDifference = difference;
//         closestLevel = parseFloat(level);
//       }
//     }
//     return closestLevel;
//   };

//   const generatePrediction = (level) => {
//     return "this pokemon should be level " + level;
//     // if (level <= 10) return "This is a low-level Pokémon";
//     // if (level <= 20) return "This is a mid-level Pokémon";
//     // if (level <= 30) return "This is a high-level Pokémon";
//     // if (level <= 40) return "This is a very high-level Pokémon";
//     // return "This is a maxed-out Pokémon";
//   };

//   const arcFractionFromLevel = (level) => {
//     return Math.pow((level - 1) / 49, 0.39);
//   };

//   useEffect(() => {
//     const scalar = calculateLevelScalar();
//     if (scalar > 0) {
//       const level = findClosestLevel(scalar);

//       setLevelScalar(scalar);
//       setCalculatedLevel(level);
//       setPredictionText(generatePrediction(level));

//       const arcVal = arcFractionFromLevel(level) * 50;
//       setArcValue(Math.max(1, Math.min(50, arcVal)));
//     }
//   }, [pokemonData]);

//   // Remaining rendering and JSX code stays the same



//   // Handle input changes
//   const handleInputChange = (field, value) => {
//     setPokemonData({
//       ...pokemonData,
//       [field]: field === 'species' ? value : Number(value)
//     });
//   };

//   // SVG dimensions and parameters for the arc
//   const svgWidth = 400;
//   const svgHeight = 150;
//   const radius = 120;
//   const centerX = svgWidth / 2;
//   const centerY = 130;
//   const arcThickness = 8;
  
//   // Calculate the angle of the colored arc (percentage of 180 degrees)
//   const percentage = arcValue / 50.0; // Convert value to a percentage (0 to 1)
  
//   // Calculate end point of arc
//   const endAngleRad = (180 - 180 * percentage) * (Math.PI / 180);
//   const endX = centerX + radius * Math.cos(endAngleRad);
//   const endY = centerY - radius * Math.sin(endAngleRad);
  
//   // Arc paths
//   const fullArcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`;
//   const coloredArcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;

//   return (
//     <div className="flex flex-col items-center p-8 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Pokémon GO Level Calculator</h2>
      
//       {/* Level Arc Display */}
//       <div className="mb-6">
//         <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
//           {/* Background semi-circle (light gray) */}
//           <path 
//             d={fullArcPath}
//             fill="none" 
//             stroke="#d0d0d0"
//             strokeWidth={arcThickness}
//             strokeLinecap="round"
//           />
          
//           {/* Colored arc based on calculated level */}
//           <path 
//             d={coloredArcPath}
//             fill="none"
//             stroke="#3366cc"
//             strokeWidth={arcThickness}
//             strokeLinecap="round"
//           />
          
//           {/* Add endpoint dot */}
//           <circle 
//             cx={endX}
//             cy={endY}
//             r="6"
//             fill="black"
//           />
          
//           {/* CP & Level Display */}
//           <text x={centerX} y={centerY - 70} textAnchor="middle" fontSize="24" fontWeight="bold">
//             CP {pokemonData.cp}
//           </text>
//           <text x={centerX} y={centerY - 40} textAnchor="middle" fontSize="16">
//             Level: {calculatedLevel}
//           </text>
//         </svg>
//       </div>
      
//       {/* Level Prediction Text */}
//       <div className="mb-6 text-center font-medium text-blue-700">
//         {predictionText}
//       </div>
      
//       {/* Form for Pokémon Data */}
//       <div className="w-full border rounded-lg p-4 mb-6">
//         <h3 className="font-bold mb-3">Pokémon Data</h3>
        
//         <div className="grid grid-cols-2 gap-3 mb-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Species</label>
//             <select 
//               value={pokemonData.species}
//               onChange={(e) => handleInputChange('species', e.target.value)}
//               className="w-full border rounded px-3 py-2"
//             >
//               {Object.keys(baseStats).sort().map(species => (
//                 <option key={species} value={species}>
//                   {species.charAt(0) + species.slice(1).toLowerCase()}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">CP</label>
//             <input 
//               type="number" 
//               value={pokemonData.cp}
//               onChange={(e) => handleInputChange('cp', e.target.value)}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//         </div>
        
//         <div className="grid grid-cols-3 gap-3 mb-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Attack IV (0-15)</label>
//             <input 
//               type="number" 
//               min="0" 
//               max="15"
//               value={pokemonData.attackIV}
//               onChange={(e) => handleInputChange('attackIV', e.target.value)}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Defense IV (0-15)</label>
//             <input 
//               type="number"
//               min="0" 
//               max="15" 
//               value={pokemonData.defenseIV}
//               onChange={(e) => handleInputChange('defenseIV', e.target.value)}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Stamina IV (0-15)</label>
//             <input 
//               type="number"
//               min="0" 
//               max="15" 
//               value={pokemonData.staminaIV}
//               onChange={(e) => handleInputChange('staminaIV', e.target.value)}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//         </div>
        
//         {/* Display Base Stats from lookup table */}
//         <div className="grid grid-cols-3 gap-3">
//           <div className="bg-gray-50 p-2 rounded">
//             <label className="block text-sm font-medium mb-1">Base Attack</label>
//             <div className="font-mono">{baseStats[pokemonData.species]?.[0] || "N/A"}</div>
//           </div>
//           <div className="bg-gray-50 p-2 rounded">
//             <label className="block text-sm font-medium mb-1">Base Defense</label>
//             <div className="font-mono">{baseStats[pokemonData.species]?.[1] || "N/A"}</div>
//           </div>
//           <div className="bg-gray-50 p-2 rounded">
//             <label className="block text-sm font-medium mb-1">Base Stamina</label>
//             <div className="font-mono">{baseStats[pokemonData.species]?.[2] || "N/A"}</div>
//           </div>
//         </div>
//       </div>
      
//       {/* Sample Pokémon Buttons */}
//       <div className="mb-6">
//         <h3 className="font-bold mb-2">Sample Pokémon</h3>
//         <div className="flex flex-wrap gap-2">
//           {samplePokemon.map((pokemon, index) => (
//             <button 
//               key={index}
//               onClick={() => setPokemonData(pokemon)} 
//               className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               {pokemon.species.charAt(0) + pokemon.species.slice(1).toLowerCase()}
//             </button>
//           ))}
//         </div>
//       </div>
      
//       {/* Calculation Results */}
//       <div className="w-full border rounded-lg p-4 bg-gray-50">
//         <h3 className="font-bold mb-2">Calculation Results</h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Calculated Level Scalar</label>
//             <div className="bg-white border rounded px-3 py-2">{levelScalar.toFixed(6)}</div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Closest CP Multiplier</label>
//             <div className="bg-white border rounded px-3 py-2">{cpMults[calculatedLevel]?.toFixed(6) || "N/A"}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { baseStats } from './baseStatTotals';
import { cpMults } from './cpLevelMults';

export default function PokemonLevelCalculator() {
  const [pokemonData, setPokemonData] = useState({
    species: "CHARIZARD",
    cp: 2145,
    attackIV: 13,
    defenseIV: 11,
    staminaIV: 14
  });

  const [calculatedLevel, setCalculatedLevel] = useState(0);
  const [levelScalar, setLevelScalar] = useState(0);
  const [arcValue, setArcValue] = useState(1);
  const [predictionText, setPredictionText] = useState("");

  const samplePokemon = [
    {
      species: "PIKACHU",
      cp: 652,
      attackIV: 10,
      defenseIV: 12,
      staminaIV: 8
    },
    {
      species: "CHARIZARD",
      cp: 2145,
      attackIV: 13,
      defenseIV: 11,
      staminaIV: 14
    },
    {
      species: "MEWTWO",
      cp: 3901,
      attackIV: 15,
      defenseIV: 15,
      staminaIV: 15
    }
  ];

  const calculateLevelScalar = () => {
    const { species, cp, attackIV, defenseIV, staminaIV } = pokemonData;
    const speciesStats = baseStats[species];
    if (!speciesStats) {
      setPredictionText("Species not found in database");
      return 0;
    }

    const [baseAttack, baseDefense, baseStamina] = speciesStats;
    const atk = baseAttack + attackIV;
    const def = Math.sqrt(baseDefense + defenseIV);
    const stam = Math.sqrt(baseStamina + staminaIV);
    const scalar = Math.sqrt((cp * 10) / (atk * def * stam));
    return scalar;
  };

  const findClosestLevel = (scalar) => {
    let closestLevel = 1;
    let smallestDifference = Infinity;
    for (const [level, mult] of Object.entries(cpMults)) {
      const difference = Math.abs(mult - scalar);
      if (difference < smallestDifference) {
        smallestDifference = difference;
        closestLevel = parseFloat(level);
      }
    }
    return closestLevel;
  };

  const generatePrediction = (level) => {
    if (level <= 10) return "This is a low-level Pokémon";
    if (level <= 20) return "This is a mid-level Pokémon";
    if (level <= 30) return "This is a high-level Pokémon";
    if (level <= 40) return "This is a very high-level Pokémon";
    return "This is a maxed-out Pokémon";
  };

  const arcFractionFromLevel = (level) => {
    return Math.pow((level - 1) / 49, 0.39);
  };

  useEffect(() => {
    const scalar = calculateLevelScalar();
    if (scalar > 0) {
      const level = findClosestLevel(scalar);

      setLevelScalar(scalar);
      setCalculatedLevel(level);
      setPredictionText(generatePrediction(level));

      const arcVal = arcFractionFromLevel(level) * 50;
      setArcValue(Math.max(1, Math.min(50, arcVal)));
    }
  }, [pokemonData]);

  const svgWidth = 400;
  const svgHeight = 150;
  const radius = 120;
  const centerX = svgWidth / 2;
  const centerY = 130;
  const arcThickness = 8;
  const percentage = arcValue / 50.0;
  const endAngleRad = (180 - 180 * percentage) * (Math.PI / 180);
  const endX = centerX + radius * Math.cos(endAngleRad);
  const endY = centerY - radius * Math.sin(endAngleRad);

  const fullArcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`;
  const coloredArcPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;

  return (
    <div className="flex flex-col items-center p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Pokémon GO Level Calculator</h2>

      <div className="mb-6">
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          <path d={fullArcPath} fill="none" stroke="#d0d0d0" strokeWidth={arcThickness} strokeLinecap="round" />
          <path d={coloredArcPath} fill="none" stroke="#3366cc" strokeWidth={arcThickness} strokeLinecap="round" />
          <circle cx={endX} cy={endY} r="6" fill="black" />
          <text x={centerX} y={centerY - 70} textAnchor="middle" fontSize="24" fontWeight="bold">CP {pokemonData.cp}</text>
          <text x={centerX} y={centerY - 40} textAnchor="middle" fontSize="16">Level: {calculatedLevel}</text>
        </svg>
      </div>

      <div className="mb-6 text-center font-medium text-blue-700">{predictionText}</div>

      <div className="w-full border rounded-lg p-4 mb-6">
        <h3 className="font-bold mb-3">Pokémon Data</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Species</label>
            <select value={pokemonData.species} onChange={(e) => handleInputChange('species', e.target.value)} className="w-full border rounded px-3 py-2">
              {Object.keys(baseStats).sort().map(species => (
                <option key={species} value={species}>{species.charAt(0) + species.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CP</label>
            <input type="number" value={pokemonData.cp} onChange={(e) => handleInputChange('cp', e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Attack IV (0-15)</label>
            <input type="number" min="0" max="15" value={pokemonData.attackIV} onChange={(e) => handleInputChange('attackIV', e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Defense IV (0-15)</label>
            <input type="number" min="0" max="15" value={pokemonData.defenseIV} onChange={(e) => handleInputChange('defenseIV', e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stamina IV (0-15)</label>
            <input type="number" min="0" max="15" value={pokemonData.staminaIV} onChange={(e) => handleInputChange('staminaIV', e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 p-2 rounded">
            <label className="block text-sm font-medium mb-1">Base Attack</label>
            <div className="font-mono">{baseStats[pokemonData.species]?.[0] || "N/A"}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <label className="block text-sm font-medium mb-1">Base Defense</label>
            <div className="font-mono">{baseStats[pokemonData.species]?.[1] || "N/A"}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <label className="block text-sm font-medium mb-1">Base Stamina</label>
            <div className="font-mono">{baseStats[pokemonData.species]?.[2] || "N/A"}</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-2">Sample Pokémon</h3>
        <div className="flex flex-wrap gap-2">
          {samplePokemon.map((pokemon, index) => (
            <button key={index} onClick={() => setPokemonData(pokemon)} className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {pokemon.species.charAt(0) + pokemon.species.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full border rounded-lg p-4 bg-gray-50">
        <h3 className="font-bold mb-2">Calculation Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Calculated Level Scalar</label>
            <div className="bg-white border rounded px-3 py-2">{levelScalar.toFixed(6)}</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Closest CP Multiplier</label>
            <div className="bg-white border rounded px-3 py-2">{cpMults[calculatedLevel]?.toFixed(6) || "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );

  function handleInputChange(field, value) {
    setPokemonData({
      ...pokemonData,
      [field]: field === 'species' ? value : Number(value)
    });
  }
}
