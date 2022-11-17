import { IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'

class UserDTO {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string
}

class CreateUserDTO extends UserDTO {}

class UpdateUserDTO extends PartialType(UserDTO) {}

class AuthenticateUserDTO extends PickType(UserDTO, ['username', 'password']) {}

export { CreateUserDTO, UpdateUserDTO, AuthenticateUserDTO }
