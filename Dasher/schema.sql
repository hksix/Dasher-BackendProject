create table users (
    userid serial primary key,
    username varchar (100) not null,
    nickname varchar (100) not null,
    location varchar (100) not null,
    timezone char (3) not null
);

create table widgets (
    widgetid serial primary key,
    widgetname varchar (200) not null
);

create table dashsettings (   
    userid integer references users,
    widgetid integer references widgets,
    placement integer not null
);