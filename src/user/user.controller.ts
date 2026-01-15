import { CreateUserDto } from '@/user/dto/createUser.dto';
import { LoginDto } from '@/user/dto/loginUser.dto';
import { IUser } from '@/user/types/user.type';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.generateUserResponse(user);
  }

  @Get('user')
  async getCurrentUser(@Req() request: Request): Promise<IUserResponse> {
    console.log('request-', request);
    return 'get current user' as any;
  }
}
