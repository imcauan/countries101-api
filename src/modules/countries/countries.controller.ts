import { Controller, Get } from '@nestjs/common';
import { CountryCode } from '@/common/decorators/country-code.decorator';
import { CountriesService } from '@/modules/countries/countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getAllCountries() {
    return this.countriesService.getAllCountries();
  }

  @Get(':code')
  async getCountryByCode(@CountryCode() code: string) {
    return this.countriesService.getCountryByCode(code);
  }
}
