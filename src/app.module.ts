/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from '@/modules/countries/countries.module';

@Module({
  imports: [
    CountriesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    HttpModule.register({
      baseURL: process.env.API_URL,
      url: process.env.FLAGS_URL,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
