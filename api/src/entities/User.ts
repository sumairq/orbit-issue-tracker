import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';

import is from 'utils/validation';
import { Comment, Issue, Project } from '.';

@Entity()
class User extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    email: [is.required(), is.email(), is.maxLength(200)],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { length: 2000 })
  avatarUrl: string;

  @Column('varchar', { nullable: true, select: false })
  password: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Issue, (issue) => issue.users)
  issues: Issue[];

  // Active board the user is currently viewing. Null for a brand-new account
  // (drives the onboarding empty state).
  @ManyToOne(() => Project)
  project: Project;

  @RelationId((user: User) => user.project)
  projectId: number;

  // All boards this user is a member of (inverse of Project.users).
  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];
}

export default User;
