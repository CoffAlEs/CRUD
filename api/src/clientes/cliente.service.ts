import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CrearCliente } from './dto/crear-cliente.dto';
import {ActualizarCliente} from './dto/actualizar-cliente.dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
    ) { }

    findAll(): Promise<Cliente[]> {
        return this.clienteRepository.find();
    }

    findOne(id: number): Promise<Cliente> {
        return this.clienteRepository.findOne({ where: { id } });
    }

    create(createClienteDto: CrearCliente): Promise<Cliente> {
        const cliente = this.clienteRepository.create(createClienteDto);
        console.log(cliente); //Log para ver los datos que se estan creando.
        return this.clienteRepository.save(cliente);
    }

    async update(id: number, updateClienteDto: ActualizarCliente): Promise<Cliente> {
        await this.clienteRepository.update(id, updateClienteDto);
        return this.clienteRepository.findOne({ where: { id } });
    }
    

    async remove(id: number): Promise <void> {
        await this.clienteRepository.delete(id);
    }
}