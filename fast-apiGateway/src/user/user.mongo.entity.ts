import { Column, Entity, ObjectIdColumn } from "typeorm";


@Entity()
class User {
  @ObjectIdColumn()
  id?: number;

  @Column({ default: null})
  name?: string;
};

export {
  User,
}