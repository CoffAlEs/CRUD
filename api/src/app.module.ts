import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Usuarios } from './usuarios/entities/usuarios.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { ClienteService } from './clientes/cliente.service';
import { ClienteController } from './clientes/cliente.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'basealteza',
      entities: [Usuarios, Cliente],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuarios]),
    TypeOrmModule.forFeature([Cliente]),
  ],
  controllers: [AppController, ClienteController],
  providers: [AppService, ClienteService],
})
export class AppModule {}
