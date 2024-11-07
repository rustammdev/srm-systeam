import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminDto } from './dto/admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schema/admin.schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { CompanyDto } from './dto/company.dto';
import { Company } from 'src/schema/company.scheme';

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async validateAdmin(adminDto: AdminDto) {
    const user = await this.adminModel.findOne({
      username: adminDto.username,
    });
    if (!user) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    if (!(await bcrypt.compare(adminDto.password, user.password))) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const access_token = this.jwtService.sign({
      sub: user._id,
      username: user.username,
      role: 'admin',
    });

    return { access_token };
  }

  // add admins
  async addAdmin({ username, password }: AdminDto, owner: string) {
    try {
      // Admin mavjud ekanligiga tekshirish
      const admin = await this.adminModel.findOne({ username });
      if (admin) {
        throw new HttpException('This username already exists.', HttpStatus.CONFLICT);
      }

      if (password.length < 6) {
        throw new HttpException('Password too short', HttpStatus.BAD_REQUEST);
      }

      const hash = await bcrypt.hash(password, 10);
      await this.adminModel.create({ username, password: hash, owner });

      return { message: 'Admin added!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // update admin login and password
  async updatePassword(userId: string, passwordPayload: UpdatePasswordDto) {
    const { oldPassword, newPassword } = passwordPayload;
    const user = await this.adminModel.findById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Eski parolni tekshirish
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new HttpException('Incorrect old password', HttpStatus.UNAUTHORIZED);
    }

    if (newPassword.length < 6) {
      throw new HttpException('Password too short', HttpStatus.BAD_REQUEST);
    }

    // Yangi parolni hash qilish
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Parolni yangilash
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password updated successfully' };
  }

  // Delete admin
  async delete(username: string, password: string) {
    const user = await this.adminModel.findOne({ username });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Eski parolni tekshirish
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    await user.deleteOne();

    return { message: 'Admin deleted' };
  }

  // Add company
  async addCompany(companyDto: CompanyDto) {
    try {
      const company = await this.companyModel.create(companyDto);
      return company;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Get company without companyId
  async getCompany(companyId: string) {
    const company = await this.companyModel.findOne({ companyName: companyId });
    if (!company) throw new HttpException('Company not found', HttpStatus.NOT_FOUND);

    return company;
  }

  async getAdmins() {
    return await this.adminModel.find();
  }
}
