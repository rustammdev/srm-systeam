import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CompanyDto } from './dto/company.dto';
import { Company } from 'src/modules/customer/schema/company.scheme';

@Injectable()
export class AdminCompanyService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  // Add company
  async addCompany({ companyName, password }: CompanyDto) {
    try {
      const hash = await bcrypt.hash(password, 10);
      const company = await this.companyModel.create({
        companyName,
        password: hash,
        status: 'active',
      });

      return {
        companyName: company.companyName,
        sub: company._id,
        status: company.status,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Get company without companyName
  async getCompany(companyName: string) {
    const company = await this.companyModel.findOne({ companyName });
    if (!company) throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    const { password, ...companyData } = company.toObject();
    return companyData;
  }

  // delete company
  async delete(companyName: string) {
    try {
      const company = await this.companyModel.deleteOne({ companyName });
      return company;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // update status
  async updateStatus(name: string, newStatus: string) {
    try {
      const filter = { companyName: name };
      const update = { status: newStatus };
      await this.companyModel.findOneAndUpdate(filter, update);

      return {
        message: `Status changed successfully, current status ${newStatus}`,
        status: newStatus,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
