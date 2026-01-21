import { CreateUserDto } from '@/user/dto/createUser.dto';
import { LoginDto } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/types/userResponse.interface';
import { UserEntiry } from '@/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntiry)
    private readonly userRepository: Repository<UserEntiry>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = new UserEntiry();
    Object.assign(newUser, createUserDto);

    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    const userByUsername = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or Username already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    const savedUser = await this.userRepository.save(newUser);
    return this.generateUserResponse(savedUser);
  }

  async loginUser(loginUserDto: LoginDto): Promise<UserEntiry> {
    console.log('LOGIN', loginUserDto);

    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user || !user.password) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const matchPassword = await compare(loginUserDto.password, user.password);

    if (!matchPassword) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;

    return user;
  }

  async updateUser(userId: number, updateUserDto: Partial<CreateUserDto>) {
    const user = await this.findById(userId);

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<UserEntiry> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException(
        `User With ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  generateToken(user: UserEntiry): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  generateUserResponse(user: UserEntiry): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateToken(user),
      },
    };
  }
}
