```
npm i nanoid
npm i express dotnev
npm i swagger-ui-express
npm i jsonwebtoken
```

## Comandos de mysql

```
mysql --user=user_name --password db_name

create table user(id varchar(32) primary key not null, username varchar(32), name varchar(64) );

create table auth(id varchar(32) primary key not null, username varchar(32), password varchar(64) );

create table user_follow (user_from varchar(32), user_to varchar(32));

alter table user_follow add unique (user_from(32), user_to(32));

insert into user (id, username, name) values ('1', 'tomasotano25', 'Tomas Garcia');

select * from user

show tables;

describe user;

create table post(id varchar(32) primary key not null, text text, user varchar(32) );

insert into post values ('999', 'Mi primer post', '1');
```
