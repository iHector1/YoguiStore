create database yoguistore;
use yoguistore;

create table tipo_usuario(
    id_tipo_usuario int auto_increment,
    tipo_de_usuario varchar(15),
    primary key(id_tipo_usuario)
);
insert into tipo_usuario   values 
(1,'Administrador'),
(2,'Empleado'),
(3,'Usuario');
describe tipo_usuario;
select * from tipo_usuario;
create table usuario(
    id_usuario int auto_increment,
    contrasena varchar(20)   ,
    correo varchar(30) not null,
    apellido_materno varchar(30) not null,
    apellido_paterno varchar(30) not null,
    nombres varchar(30) not null,
    id_tipo_usuario int not null,
    primary key(id_usuario), 
    foreign key(id_tipo_usuario) references tipo_usuario(id_tipo_usuario)
);
describe usuario;
insert into usuario value 
(1,'12345','admin@admin.com','Gonzalez','Cortes','Hector Josue',1);
select * from usuario inner join tipo_usuario where usuario.id_tipo_usuario = tipo_usuario.id_tipo_usuario;
create table info_usuario(
    id_info_usuario int    auto_increment,
    estado varchar(30) not null,
    calle varchar(30) not null,
    no_exterior smallint not null,
    colonia varchar(20) not null,
    cp int not null,
    id_usuario int not null,
    primary key(id_info_usuario),
    foreign key(id_usuario) references usuario(id_usuario)
);
desc info_usuario;
insert into info_usuario value 
(1,"Jalisco","circunvalacion",123,"Oblatos",44700,1);
select * from info_usuario;
create table marca(
    id_marca int auto_increment,
    marca varchar(30) not null,
    primary key(id_marca)
);
desc marca;
insert into marca()   values 
(1,"Vans"),
(2,"Puma"),
(3,"Converse"),
(4,"Nike"),
(5,"Adidas");
select * from marca;
create table modelo(
    id_modelo int auto_increment,
    modelo varchar(30) not null,
    primary key(id_modelo)
);
desc modelo;
insert into modelo(modelo)   values 
("Casuales"),
("deportivos");

select * from modelo;

create table talla(
    id_talla int auto_increment,
    talla varchar(30),
    primary key(id_talla)
);
insert talla (talla) values ('24'),
('24.5'),
('25'),
('25.5'),
('26'),
('26.5'),
('27'),
('27.5'),
('28'),
('28.5'),
('29'),
('29.5'),
 ('30');
 select * from talla;
create table articulo(
    id_articulo int auto_increment,
    id_modelo int not null,
    id_marca int not null,
    id_talla int not null,
    nombre varchar(30) not null,
    imagen longblob not null,
    stock int not null,
    precio decimal not null,
    primary key(id_articulo),
    foreign key(id_modelo) references modelo(id_modelo),
    foreign key(id_marca) references marca(id_marca),
    foreign key(id_talla) references talla(id_talla)
);

create table estatus(
    id_estatus int auto_increment,
    estatus varchar(12) not null,
    primary key(id_estatus)
);
 desc estatus;
 insert into estatus(estatus) values 
 ("Entregado"),
 ("Recoger");
 
 select * from estatus;
 
create table pedido(
    id_pedido int auto_increment,
    id_usuario int not null,
    cantidad_articulos int not null,
    precio_total smallint not null,
    fecha_pedido timestamp not null,
    id_estatus int not null,
    primary key(id_pedido),
    foreign key(id_usuario) references usuario(id_usuario),
    foreign key(id_estatus) references estatus(id_estatus)
);

create table detalle_pedido(
    id_detalle int auto_increment,
    no_orden int not null,
    id_articulo int not null,
    total_articulo decimal ,
    primary key(id_detalle)
);

alter table detalle_pedido add foreign key(id_articulo) references articulo(id_articulo);
alter table detalle_pedido add foreign key(no_orden) references pedido(id_pedido);

create table carrito(
    id_carrito int auto_increment,
    id_usuario int not null,
    precio_total float not null,
    primary key(id_carrito),
    foreign key(id_usuario) references usuario(id_usuario)
);

create table articulo_carrito(
    id_seleccion int auto_increment,
    id_carrito int not null,
    id_articulo int not null,
    cantidad_articulos int not null,
    total_articulo decimal not null,
    primary key(id_seleccion),
    foreign key(id_carrito) references carrito(id_carrito),
    foreign key(id_articulo) references articulo(id_articulo)
);

