'use client';
import { useState } from 'react';
import Select from 'react-select';
import { countries } from '../public/database/countries';

const allCountries = countries;

export default function SelectCountries() {
  const [country, setCountry] = useState({
    value: 'Colombia',
    label: 'Colombia'
  });
  const id = '1';

  return (
    <div>
      <label style={{ fontSize: 14 }}>País:</label>
      <Select
        id={id}
        name="country"
        value={country}
        onChange={(e): void => {
          setCountry(e!);
        }}
        instanceId={id}
        options={allCountries}
        isSearchable
        placeholder="Seleeciona el pais desde el que te contactas"
      />
    </div>
  );
}
