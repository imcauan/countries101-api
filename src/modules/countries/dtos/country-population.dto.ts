import { PopulationCount } from '@/modules/countries/dtos/population-count.dto';

export interface CountryPopulationDto {
  country: string;
  code: string;
  populationCounts: PopulationCount[];
}
