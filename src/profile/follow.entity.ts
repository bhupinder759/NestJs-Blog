import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'follows' })
export class FollowEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;
}
