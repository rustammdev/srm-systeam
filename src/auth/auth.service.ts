import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthModerDto, AuthCompanyDto } from './dto/index';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyDto } from 'src/admin/dto/company.dto';
import * as bcrypt from 'bcryptjs';
import { Company } from 'src/modules/customer/schema/company.scheme';
import { Moder } from 'src/modules/customer/schema/moder.scheme';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
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
    if (user.status === 'active' || user.status === 'freez')
      return {
        access_token: this.jwtService.sign({
          sub: userData._id,
          companyName: userData.companyName,
          status: user.status,
          role: 'founder',
        }),
      };
    throw new HttpException(`Your company is currently BLOCKED.`, HttpStatus.FORBIDDEN);
  }

  async validateModerUser(authPayload: AuthModerDto) {
    try {
      const { username } = authPayload;
      const moder = await this.moderModel
        .findOne({ username })
        .populate({ path: 'company', select: '_id companyName status' });
      if (!moder) {
        throw new HttpException('Moderator not found', HttpStatus.NOT_FOUND);
      }

      if (!(await bcrypt.compare(authPayload.password, moder.password))) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }

      const status = moder.company['status'];
      if (status === 'active' || status === 'freez')
        return {
          access_token: this.jwtService.sign({
            sub: moder._id,
            companyName: moder.company['companyName'],
            companyId: moder.company['_id'],
            status,
            role: 'moder',
          }),
        };
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
