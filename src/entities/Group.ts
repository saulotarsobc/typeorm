import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TimestampCols } from "./utils/timestampscols";

@Entity({ name: "groups" })
export class Group extends TimestampCols {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: "PK_group",
    unsigned: true,
  })
  id!: number;

  @Column({
    nullable: false,
  })
  name!: string;

  @Column({
    nullable: true,
  })
  description?: string;
}
