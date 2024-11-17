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
import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto } from './dto';
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
    const id = req.user['companyId'] ?? req.user['sub'];
    return this.groupService.add(id, groupPayload);
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
    const id = req.user['companyId'] ?? req.user['sub'];
    return this.groupService.getAll(id);
  }

  // Get group and students
  @Get('group/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async getGroup(@Param('id') id: string) {
    // Group Id
    return this.groupService.get(id);
  }

  // Update group - change Status
  @Put('group/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('founder', 'moder')
  async updateGroup(
    @Body(new ValidationPipe()) updateGroupPayload: UpdateGroupDto,
    @Param('id') id: string,
  ) {
    return this.groupService.update(id, updateGroupPayload);
  }
}
