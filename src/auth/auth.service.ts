import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthModerDto, AuthCompanyDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly companyStatus = [
    {
      id: 1,
      companyName: 'itschool',
      status: 'active',
    },
    {
      id: 2,
      companyName: 'itschool2',
      status: 'freez',
    },
    {
      id: 3,
      companyName: 'itschool3',
      status: 'blocked',
    },
  ];

  private readonly fakeAuthSchool = [
    {
      id: 1,
      companyName: 'itschool',
      password: 'abc123',
    },
    {
      id: 2,
      companyName: 'itschool2',
      password: 'abc123',
    },
    {
      id: 3,
      companyName: 'itschool3',
      password: 'abc123',
    },
  ];

  private readonly fakeUserModer = [
    {
      id: 1,
      companyName: 'itschool',
      login: 'AB1505260',
      password: 'abc123',
    },
  ];

  constructor(private jwtService: JwtService) {}

  validateFounderUser(authPayload: AuthCompanyDto) {
    const user = this.fakeAuthSchool.find(
      (u) => u.companyName === authPayload.companyName,
    );

    if (!user) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== authPayload.password) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    const { password, ...userData } = user;

    const status = this.validateCompanyStatus(user.companyName, 'Founder');
    if (status === 'active' || status === 'freez')
      return {
        access_token: this.jwtService.sign({
          ...userData,
          status,
          role: 'founder',
        }),
      };

    return status;
  }

  validateModerUser(authPayload: AuthModerDto) {
    const user = this.fakeUserModer.find(
      (u) =>
        u.companyName === authPayload.companyName &&
        u.login === authPayload.userName,
    );

    if (!user) {
      throw new HttpException('Moderator not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== authPayload.password) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }

    const { password, ...userData } = user;

    const status = this.validateCompanyStatus(user.companyName, 'Moderator');
    if (status === 'active' || status === 'freez')
      return {
        access_token: this.jwtService.sign({
          ...userData,
          status,
          role: 'moder',
        }),
      };

    return status;
  }

  private validateCompanyStatus(companyName: string, userRole: string) {
    const companyStatus = this.companyStatus.find(
      (c) => c.companyName === companyName,
    );

    if (!companyStatus) {
      return { message: 'Company status not found' };
    }

    if (companyStatus.status === 'active' || companyStatus.status === 'freez') {
      return companyStatus.status;
    }

    throw new HttpException(
      `Your company is currently BLOCKED.`,
      HttpStatus.FORBIDDEN,
    );
  }
}
