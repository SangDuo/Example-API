import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardController } from './board.controller'
import { Board } from './board.entity'
import { BoardService } from './board.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
