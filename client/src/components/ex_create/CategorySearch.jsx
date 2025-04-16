import React, { useEffect, useState } from 'react'

const CategorySearch = ({ onSearch, bodyParts }) => {
  const equipmentNames = [
    'barbell',
    'dumbbell',
    'other',
    'body only',
    'cable',
    'machine',
    'kettlebells',
    'bands',
    'medicine ball',
    'exercise ball',
    'foam roll',
    'e-z curl bar'
  ];
  const [selectedEquipment, setSelectedEquipment] = useState('')
  const [selectedpart, setSelectedpart] = useState('')

  useEffect(() => {
    if ((selectedpart || "") && (selectedEquipment || "")) {
      onSearch(selectedpart, selectedEquipment);
    } else {
      // Handle case where one of the values is missing
      console.log('Missing values: ', { selectedpart, selectedEquipment });
    }
  }, [selectedEquipment, selectedpart]);


  return (
    <div className="flex flex-col md:flex-row md:items-center  space-y-4 md:space-y-0  gap-2">
      {/* Body Part Dropdown */}
      <select
        id="bodyParts"
        value={selectedpart}
        onChange={(e) => setSelectedpart(e.target.value)}
        className="border px-1 py-1.5 rounded-md w-full md:w-1/2"
      >
        <option value="" disabled>BodyPart</option>
        {bodyParts.map((part, index) => (
          <option key={index} value={part}>{part}</option>
        ))}
      </select>

      {/* Equipment Dropdown */}
      <select
        id="equipment"
        value={selectedEquipment}
        onChange={(e) => setSelectedEquipment(e.target.value)}
        className="border px-1 py-1.5 rounded-md w-full md:w-1/2"
      >
        <option value="" disabled>Equipment</option>
        {equipmentNames.map((equipment, index) => (
          <option key={index} value={equipment}>{equipment}</option>
        ))}
      </select>
    </div>


  );
};


export default CategorySearch

