import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { FounderStrategy } from './strategies/founder.stratgy';
// import { ModerStrategy } from './strategies/moderStrategy';
import { JwtStrategy } from './strategies/jwt.stratgy';
import { MongooseModule } from '@nestjs/mongoose';
import { ModerStrategy } from './strategies/moderStrategy';
import { Company, CompanySchema } from 'src/modules/customer/schema/company.scheme';
import { Moder, ModerSchema } from 'src/modules/customer/schema/moder.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: Moder.name, schema: ModerSchema }]),
    JwtModule.register({
      secret: process.env.JWT_PASSWORD,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FounderStrategy, ModerStrategy, JwtStrategy],
})
export class AuthModule {}
