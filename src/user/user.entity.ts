import { genSalt, hash } from 'bcrypt'
import { Board } from 'src/board/board.entity'
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Board, (board) => board.writer)
  board: Board[]

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt(10)
    this.password = await hash(this.password, salt)
  }
}

export { User }
