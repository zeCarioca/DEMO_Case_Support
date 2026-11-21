export interface PresetZip {
  zip: string;
  label: string;
  type: string;
}

export const PRESET_ZIPS: PresetZip[] = [
  { zip: '10001', label: '10001 (NYC)', type: 'Metro' },
  { zip: '90210', label: '90210 (Beverly Hills)', type: 'Metro' },
  { zip: '33139', label: '33139 (Miami)', type: 'Metro' },
  { zip: '75001', label: '75001 (Dallas)', type: 'Metro' },
  { zip: '04401', label: '04401 (Bangor)', type: 'Micro' },
  { zip: '79852', label: '79852 (Terlingua)', type: 'Rural' },
  { zip: '90213', label: '90213 (PO Box)', type: 'PO Box' },
];
