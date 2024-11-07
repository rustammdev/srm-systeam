import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthModerDto, AuthCompanyDto } from './dto/index';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/schema/company.scheme';
import { Model } from 'mongoose';
import { Moder } from 'src/schema/moder.scheme';
import { CompanyDto } from 'src/admin/dto/company.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(Moder.name) private moderModel: Model<Moder>,
  ) {}

  async validateFounderUser(authPayload: AuthCompanyDto) {
    const user = await this.companyModel.findOne({ companyName: authPayload.companyName });
    if (!user) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    if (!(await bcrypt.compare(authPayload.password, user.password))) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const { password, ...userData } = user.toObject();
    const res = this.validateCompanyStatus(user.status, 'founder', userData);
    return res;
  }

  async validateModerUser(authPayload: AuthModerDto) {
    try {
      const { username } = authPayload;
      const moder = await (await this.moderModel.findOne({ username })).populated('company');
      console.log(moder);
      if (!moder) {
        throw new HttpException('Moderator not found', HttpStatus.NOT_FOUND);
      }

      if (!(await bcrypt.compare(authPayload.password, moder.password))) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }

      const { password, ...userData } = moder;
      const res = this.validateCompanyStatus(moder.status, 'moder', userData);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async validateCompanyStatus(status: string, userRole: string, userData: any) {
    if (status === 'active' || status === 'freez')
      return {
        access_token: this.jwtService.sign({
          sub: userData._id,
          companyName: userData.companyName,
          status: status,
          role: userRole,
        }),
      };

    throw new HttpException(`Your company is currently BLOCKED.`, HttpStatus.FORBIDDEN);
  }
}
