import { User } from 'src/user/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
class Board {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @ManyToOne(() => User, (user) => user.board, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  writer: User
}

export { Board }
