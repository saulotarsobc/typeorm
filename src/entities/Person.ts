import { Entity, Column, Unique, ForeignKey, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { TimestampCols } from "./utils/timestampscols";
import Address from "./Eddress";

export enum PersonType {
  INDIVIDUAL = "individual",
  COMPANY = "company",
}

@Entity({ name: "persons" })
export class Person extends TimestampCols {
  @Unique("UQ_person_cpf", ["cpf"])
  @Column({ nullable: false })
  cpf!: string;

  @Unique("UQ_person_email", ["email"])
  @Column({ nullable: false })
  email!: string;

  @Column({
    type: "enum",
    enum: PersonType,
    nullable: false,
    default: PersonType.INDIVIDUAL,
    enumName: "PersonTypeEnum",
  })
  type!: PersonType;

  @PrimaryColumn({
    type: "int",
    unsigned: true,
    primaryKeyConstraintName: "PK_person_user_id",
  })
  @ForeignKey(() => User, {
    name: "FK_person_user_id",
    onDelete: "RESTRICT",
  })
  user_id!: number;
}

@Entity("person_address")
export class PersonAddress extends TimestampCols {
  @ForeignKey(() => Person, {
    name: "FK_person_address_person_id",
    onDelete: "CASCADE",
  })
  @PrimaryColumn({
    type: "int",
    unsigned: true,
    primaryKeyConstraintName: "PK_person_address",
  })
  person_id!: number;

  @ForeignKey(() => Address, {
    name: "FK_person_address_address_id",
    onDelete: "CASCADE",
  })
  @PrimaryColumn({
    type: "int",
    unsigned: true,
    primaryKeyConstraintName: "PK_person_address",
  })
  address_id!: number;
}
