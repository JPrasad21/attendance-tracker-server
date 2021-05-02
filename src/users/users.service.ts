import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSectionDto } from 'src/class/dto/class.dto';
import { Class, ClassDocument } from 'src/class/schema/class.schema';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User, UserDocument } from './schema/users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(Class.name) private classModel: Model<ClassDocument>) { }
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }
  async createStudent() {
    const classes = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    const section = ["A", "B", "C", "D"];
    for (let classIndex = 0; classIndex < classes.length; classIndex++) {
      const className = classes[classIndex];
      const classObj: Class = {
        className,
        sections: []
      }
      for (let sectionIndex = 0; sectionIndex < section.length; sectionIndex++) {
        const sectionName = section[sectionIndex];
        const currentSection = {
          sectionName,
          studentId: []
        }
        for (let studentIndex = 0; studentIndex < 5; studentIndex++) {
          const student: CreateUserDto = {
            fullName: `Student ${studentIndex + 1}`,
            email: `student${studentIndex + 1}-${className}-${sectionName}@gmail.com`,
            role: 'Student',
            password: `student${studentIndex + 1}-${className}-${sectionName}`
          }
          let user = await this.create(student);
          currentSection.studentId.push(user._id);
        }
        classObj.sections.push(currentSection);
      }
      await this.classModel.create(classObj);
    }
    return 'Success';
  }
  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
