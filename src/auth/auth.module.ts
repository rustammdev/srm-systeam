import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { FounderStrategy } from './strategies/founder.stratgy';
// import { ModerStrategy } from './strategies/moderStrategy';
import { JwtStrategy } from './strategies/jwt.stratgy';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/schema/company.scheme';
import { Moder, ModerSchema } from 'src/schema/moder.scheme';
import { ModerStrategy } from './strategies/moderStrategy';

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
