import { Entity, PrimaryGeneratedColumn, Column, ForeignKey } from "typeorm";
import { Group } from "./Group";
import { TimestampCols } from "./utils/timestampscols";

@Entity({ name: "users" })
export class User extends TimestampCols {
  @PrimaryGeneratedColumn({
    unsigned: true,
    primaryKeyConstraintName: "PK_user",
  })
  id!: number;

  @Column({ nullable: false })
  username!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  @ForeignKey(() => Group, { name: "FK_user_group_id", onDelete: "RESTRICT" })
  group_id!: number;
}
