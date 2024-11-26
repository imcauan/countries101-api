/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CountryModel } from '@/common/models/country.model';
import { CountryPopulationDto } from '@/modules/countries/dtos/country-population.dto';
import { CountryFlagDto } from '@/modules/countries/dtos/country-flag.dto';
import { GetAllCountriesResponseDto } from '@/modules/countries/dtos/get-all-countries-response.dto';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAllCountries() {
    try {
      const countries = this.httpService.axiosRef
        .get<GetAllCountriesResponseDto[]>(
          `${process.env.API_URL}/AvailableCountries`,
        )
        .then((res) => res.data)
        .then((res) =>
          res.map((country) => ({
            commonName: country.name,
            countryCode: country.countryCode,
          })),
        );

      return countries;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCountryByCode(code: string) {
    try {
      const countryData = await this.httpService.axiosRef
        .get<CountryModel>(`${process.env.API_URL}/CountryInfo/${code}`)
        .then((res) => res.data);

      if (!countryData) {
        throw new NotFoundException('Country not found');
      }

      const countryPopulation = (await this.getCountriesPopulation()).filter(
        (country) => country.country === countryData.commonName,
      )[0];

      const countryFlag = (await this.getCountriesFlags()).find(
        (country) => country.name === countryData.commonName,
      );

      const country: CountryModel = {
        commonName: countryData.commonName,
        countryCode: countryData.countryCode,
        borders: countryData.borders,
        flagUrl: countryFlag?.flag,
        population: countryPopulation?.populationCounts,
      };

      return country;
    } catch (error) {
      console.log(error);
    }
  }

  async getCountriesPopulation(): Promise<CountryPopulationDto[]> {
    try {
      const populations = await this.httpService.axiosRef
        .get(`${process.env.FLAGS_URL}/population`)
        .then((res) => res.data);
      return populations.data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCountriesFlags(): Promise<CountryFlagDto[]> {
    try {
      const flags = await this.httpService.axiosRef
        .get('https://countriesnow.space/api/v0.1/countries/flag/images')
        .then((res) => res.data);

      return flags.data.map((country: CountryFlagDto) => ({
        name: country.name,
        flag: country.flag,
      }));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
