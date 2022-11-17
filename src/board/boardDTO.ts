import { IsString } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

class BoardDTO {
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  content: string
}

class CreateBoardDTO extends BoardDTO {}

class UpdateBoardDTO extends PartialType(BoardDTO) {}

export { CreateBoardDTO, UpdateBoardDTO }
