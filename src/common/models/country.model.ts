import { PopulationCount } from 'src/modules/countries/dtos/population-count.dto';

export interface CountryModel {
  commonName: string;
  countryCode: string;
  flagUrl?: string;
  borders: string[];
  population?: PopulationCount[];
}
