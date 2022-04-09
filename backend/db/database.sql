create table user ( 
	id integer , 
	email text unique not null, 
	password text not null,
	verifed integer not null,
	url_verification text, 
	constraint pk_user primary key (id)
);

create table list (
    id integer,
    user_id integer not null,
    description text not null,
    constraint pk_list primary key (id),
    constraint fk_user foreign key (user_id) references user(id)
);

create table task (
    id integer,
    list_id integer not null,
    title text not null,
    description text,
    deadline date,
    completed integer not null,
    constraint pk_task primary key (id),
    constraint fk_list foreign key (list_id) references list(id)
);

create table step (
    id integer,
    task_id integer not null,
    description text,
    completed interger not null,
    constraint pk_step primary key (id),
    constraint fk_task foreign key (task_id) references task(id)
);