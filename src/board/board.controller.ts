import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { GetUser } from 'src/user/user.decorator'
import { User } from 'src/user/user.entity'
import { BoardService } from './board.service'
import { CreateBoardDTO, UpdateBoardDTO } from './boardDTO'

@ApiTags('Board API')
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/')
  findAll() {
    return this.boardService.findAll()
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findById(id)
  }

  @UseGuards(AuthGuard())
  @Post('/')
  create(@Body() createBoardDTO: CreateBoardDTO, @GetUser() user: User) {
    return this.boardService.create(createBoardDTO, user)
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDTO: UpdateBoardDTO,
    @GetUser() user: User,
  ) {
    return this.boardService.update(id, updateBoardDTO, user)
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.boardService.delete(id, user)
  }
}
