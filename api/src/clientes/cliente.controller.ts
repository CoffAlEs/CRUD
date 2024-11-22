import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CrearCliente } from './dto/crear-cliente.dto';
import { ActualizarCliente } from './dto/actualizar-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Controller('clientes')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Get()
    async findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Cliente> {
        return this.clienteService.findOne(+id);
    }

    @Post()
    create(@Body() createClienteDto: CrearCliente): Promise<Cliente> {
        return this.clienteService.create(createClienteDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateClienteDto: ActualizarCliente): Promise<Cliente> {
        return this.clienteService.update(+id, updateClienteDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.clienteService.remove(+id);
    }
}
