import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/guard/decorator/roles.decorator';

@Controller('company')
export class GroupController {
  constructor(private groupService: GroupService) {}

  //  Create group
  @Post('group')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async createGroup(@Body(new ValidationPipe()) groupPayload: CreateGroupDto, @Req() req: any) {
    const { sub } = req.user;
    return this.groupService.add(sub, groupPayload);
  }

  // Delete Group- id
  @Delete('group/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async delGroup(@Param('id') id: string) {
    return this.groupService.del(id);
  }

  // Get all group
  @Get('group')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getGroups(@Req() req: any) {
    const { sub } = req.user;
    return this.groupService.getAll(sub);
  }

  // Get group, students
  @Delete('group/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getGroup(@Param('id') id: string) {
    // Group Id
    return this.groupService.get(id);
  }

  // Update group - change Status
  // Add student
}
