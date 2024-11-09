import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminStrategy } from './strategies/admin.strategy';
import { JwtStrategyAdmin } from './strategies/jwt.stratgy';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schema/admin.schemas';
import { Company, CompanySchema } from 'src/schema/company.scheme';
import { AdminCompanyService } from './company.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    JwtModule.register({
      secret: process.env.JWT_PASSWORD_ADMIN,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminCompanyService, AdminStrategy, JwtStrategyAdmin],
})
export class AdminModule {}
