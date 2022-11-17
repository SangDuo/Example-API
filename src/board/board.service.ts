import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { DataSource, Repository } from 'typeorm'
import { Board } from './board.entity'
import { CreateBoardDTO, UpdateBoardDTO } from './boardDTO'

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.boardRepository.find()
  }

  findById(id: number) {
    return this.boardRepository.findOneBy({ id: id })
  }

  async create(createBoardDTO: CreateBoardDTO, user: User) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const board = queryRunner.manager.create(Board, {
        ...createBoardDTO,
        writer: user,
      })
      await queryRunner.manager.save(board)
      await queryRunner.commitTransaction()
      return board
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async delete(id: number, user: User) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const board = await queryRunner.manager.findOneBy(Board, { id: id })
      if (!board) {
        throw new BadRequestException('존재하지 않는 유저입니다.')
      } else if (board.writer.id !== user.id) {
        throw new BadRequestException('본인의 게시물만 삭제할 수 있습니다.')
      }
      await queryRunner.manager.delete(Board, { id: id })
      await queryRunner.commitTransaction()
      return '정상적으로 게시물이 삭제되었습니다.'
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async update(id: number, updateBoardDTO: UpdateBoardDTO, user: User) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const board = await queryRunner.manager.findOneBy(Board, { id: id })
      if (!board) {
        throw new BadRequestException('존재하지 않는 유저입니다.')
      } else if (board.writer.id !== user.id) {
        throw new BadRequestException('본인의 게시물만 수정할 수 있습니다.')
      }
      console.log(updateBoardDTO)
      await queryRunner.manager.update(Board, { id: id }, updateBoardDTO)
      await queryRunner.commitTransaction()
      return '정상적으로 게시물이 수정되었습니다.'
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }
}
