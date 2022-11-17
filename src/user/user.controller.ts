import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './user.decorator'
import { User } from './user.entity'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthenticateUserDTO, CreateUserDTO, UpdateUserDTO } from './userDTO'

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  findAll() {
    return this.userService.findAll()
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id)
  }

  @Post('/')
  register(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO)
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDTO: UpdateUserDTO,
    @GetUser() user: User,
  ) {
    if (id === user.id) {
      return this.userService.update(id, updateUserDTO)
    } else {
      throw new UnauthorizedException('권한이 없습니다.')
    }
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    if (id === user.id) {
      return this.userService.delete(id)
    } else {
      throw new UnauthorizedException('권한이 없습니다.')
    }
  }

  @Post('/login')
  login(@Body() authenticateUserDTO: AuthenticateUserDTO) {
    return this.userService.authenticate(authenticateUserDTO)
  }
}
