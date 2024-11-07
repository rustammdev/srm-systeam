import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { CompanyDto } from './dto/company.dto';
import { AdminCompanyService } from './company.service';
import { StatusDto } from './dto/status.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private companyService: AdminCompanyService,
  ) {}

  // Tizimga kirish
  @Post('signin')
  signIn(@Body(new ValidationPipe()) adminDto: AdminDto) {
    return this.adminService.validateAdmin(adminDto);
  }

  // Admin uchun Login hamda parol yaratish
  @Post()
  @UseGuards(AuthGuard('admin'))
  async addAdmin(@Body() adminPayload: AdminDto, @Req() req: any) {
    const { sub } = req.user;
    return this.adminService.addAdmin(adminPayload, sub);
  }

  // Login hamda parolni yangilash
  @Put()
  @UseGuards(AuthGuard('admin'))
  async updateAdmin(
    @Req() req: any,
    @Body(new ValidationPipe())
    passwordPayload: UpdatePasswordDto,
  ) {
    const { sub } = req.user;
    return this.adminService.updatePassword(sub, passwordPayload);
  }

  // Delete admin
  @Delete()
  @UseGuards(AuthGuard('admin'))
  async deleteAdmin(@Body() data: { username: string; password: string }) {
    const { username, password } = data;
    return await this.adminService.delete(username, password);
  }

  // Adminlar ro'yxatini olish
  @Get()
  @UseGuards(AuthGuard('admin'))
  async getAdmins() {
    return this.adminService.getAdmins();
  }

  // Yangi company qo'shish
  @Post('company')
  @UseGuards(AuthGuard('admin'))
  async addCompany(@Body(new ValidationPipe()) companyDto: CompanyDto) {
    return this.companyService.addCompany(companyDto);
  }

  // Get company
  @Get('company/:id')
  @UseGuards(AuthGuard('admin'))
  async getCompanyData(@Param('id') id: string) {
    return this.companyService.getCompany(id);
  }

  // Mavjud companyni o'chirish
  @Delete('company/:id')
  @UseGuards(AuthGuard('admin'))
  async deleteCompany(@Param('id') id: string) {
    return await this.companyService.delete(id);
  }

  // Company statusini o'zgartirish
  @Put('company/:id')
  @UseGuards(AuthGuard('admin'))
  async changeCompanyStatus(@Param('id') id: string, @Body() data: StatusDto) {
    return await this.companyService.updateStatus(id, data.status);
  }
}
