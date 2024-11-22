import { IsString, IsOptional, IsDateString } from 'class-validator';

export class ActualizarCliente {
    @IsOptional()
    @IsString()
    tipoRegistro?: string;

    @IsOptional()
    @IsString()
    denominacion?: string;

    @IsOptional()
    @IsDateString()
    fechaIngresoSolicitud?: string;

    @IsOptional()
    @IsDateString()
    fechaPublicacionSolicitud?: string;

    @IsOptional()
    @IsString()
    archivoFonetico?: string;

    @IsOptional()
    @IsString()
    concesion?: string;

    @IsOptional()
    @IsString()
    vigencia?: string;

    @IsOptional()
    @IsString()
    observaciones?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsDateString()
    fechaNacimiento?: string;

    @IsOptional()
    @IsString()
    edad?: number;

    @IsOptional()
    @IsString()
    curp?: string;

    @IsOptional()
    @IsString()
    localidad?: string;

    @IsOptional()
    @IsString()
    origen?: string;
}
