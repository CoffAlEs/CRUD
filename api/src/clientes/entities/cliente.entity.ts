import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    expediente: string;

    @Column()
    tipoRegistro: string;

    @Column()
    denominacion: string;

    @Column({ type: 'date' })
    fechaIngresoSolicitud: Date;

    @Column({ type: 'date' })
    fechaPublicacionSolicitud: Date;

    @Column()
    archivoFonetico: string;

    @Column()
    concesion: string;

    @Column()
    vigencia: string;

    @Column({ nullable: true })
    observaciones: string;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column({ type: 'date' })
    fechaNacimiento: Date;

    @Column()
    edad: number;

    @Column()
    curp: string;

    @Column()
    localidad: string;

    @Column()
    origen: string;
}
