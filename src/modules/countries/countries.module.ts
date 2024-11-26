import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountriesController } from '@/modules/countries/countries.controller';
import { CountriesService } from '@/modules/countries/countries.service';

@Module({
  imports: [HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
