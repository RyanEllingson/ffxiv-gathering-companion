CREATE TABLE items
(
    id int NOT NULL AUTO_INCREMENT,
    item_name varchar(255) NOT NULL,
    image_url varchar(255),
    discipline varchar(255) NOT NULL,
    region varchar(255) NOT NULL,
    coordinates varchar(255) NOT NULL,
    aetheryte varchar(255),
    start_time varchar(255) NOT NULL,
    duration int NOT NULL,
    node_type varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users
(
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE alarms
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    item_id int NOT NULL,
    notes varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);