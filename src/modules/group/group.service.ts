import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schema/group.scheme';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  // create group
  async add(sub: string, groupPayload: CreateGroupDto) {
    try {
      const science = await this.groupModel.create({
        company: sub,
        ...groupPayload,
      });
      return science;
    } catch (error) {
      if (error.code === 11000)
        throw new HttpException('This science alredy exist.', HttpStatus.BAD_REQUEST);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // delete group
  async del(id: string) {
    try {
      return await this.groupModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // get all group
  async getAll(sub: string) {
    return await this.groupModel.find({ company: sub });
  }

  // Get group and group students
  async get(groupId: string) {
    try {
      const group = await this.groupModel.findById({ _id: groupId }).populate([
        { path: 'science', select: '_id science price term' },
        { path: 'teacher', select: '_id firstname firstname phoneNumber specialty' },
      ]);

      if (!group) throw new HttpException('Group not found', HttpStatus.NOT_FOUND);

      return group;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
