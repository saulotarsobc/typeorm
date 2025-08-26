import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { TimestampCols } from "./utils/timestampscols";

@Entity({ name: "addresses" })
export default class Address extends TimestampCols {
  @PrimaryGeneratedColumn("increment", {
    primaryKeyConstraintName: "PK_address",
    unsigned: true,
  })
  id!: string;

  @Column({ length: 200 })
  street!: string;

  @Column({ length: 50, nullable: true })
  number?: string;

  @Column({ length: 150, nullable: true })
  complement?: string;

  @Column({ length: 100, nullable: true })
  neighborhood?: string;

  @Column({ length: 100, nullable: true })
  city!: string;

  @Column({ length: 50, nullable: true })
  state!: string;

  @Index("IDX_zip_code")
  @Column({ name: "zip_code", length: 20, nullable: true })
  zip_code!: string;

  @Column({ length: 100, nullable: true })
  country?: string;

  @Column({ type: "json", nullable: true })
  coordinates?: { latitude: number; longitude: number };
}
