CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `stats` json DEFAULT NULL,
  `rang` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `permission_lvl` int DEFAULT 1,
  `photo` varchar(255) DEFAULT NULL,
  `is_mail_activated` BOOLEAN DEFAULT FALSE,
  `date_of_create` DATE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `users_tokens` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `refreshToken` TEXT DEFAULT NULL,
  
  FOREIGN KEY (user_id) REFERENCES users (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE `habits` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `notes` json DEFAULT NULL,
  `dynamics` json DEFAULT NULL,
  `is_healfully` BOOLEAN DEFAULT FALSE,
  `value` int DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `date_of_create` DATE DEFAULT (CURRENT_DATE),
  FOREIGN KEY (user_id) REFERENCES users (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (1,'title1', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-21", "value":"1001"}]', FALSE, 10, "2021-08-21");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (1,'title2', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-22", "value":"1002"}]', TRUE, 100, "2021-08-21");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (1,'title3', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-23", "value":"1003"}]', FALSE, 10, "2021-08-22");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (1,'title4', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-24", "value":"1004"}]', FALSE, 10, "2021-08-23") ;
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value) VALUES (1,'title555', 1223, 150,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-25", "value":"1005"}]', TRUE, 10) ;
 
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title5', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title6', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title7', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title8', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title9', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title10', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title11', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title12', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title13', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title14', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title15', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title16', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title17', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title18', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title19', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title20', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title21', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title22', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title23', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title24', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title25', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title26', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title27', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title28', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title29', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title30', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title31', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title32', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title33', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title34', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title35', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title36', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title37', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title38', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title39', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title40', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title41', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title42', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title43', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title44', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title45', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title46', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title47', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title48', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title49', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title50', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title51', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title52', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title53', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title54', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title55', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title56', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title57', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title58', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title59', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title60', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");

INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title61', 10, 11,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-26", "value":"1006"}]', FALSE, 10, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title62', 111, 12,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-27", "value":"1007"}]', TRUE, 100, "2021-08-24");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title63', 112, 14,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-28", "value":"1008"}]', FALSE, 10, "2021-08-25");
INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title64', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-08-29", "value":"1009"}]', FALSE, 10, "2021-08-26");



INSERT INTO habits (user_id, title, priority, difficulty, notes, dynamics, is_healfully, value, date_of_create) VALUES (2,'title65', 123, 15,'[{"title":"zxc", "text":"text1"}]','[{"date":"2021-07-29","value":"1009"},{"date":"2021-07-30","value":"1009"},{"date":"2021-07-31","value":"1009"},{"date":"2021-08-15","value":"1009"},{"date":"2021-08-16","value":"1009"},{"date":"2021-08-20","value":"1009"},{"date":"2021-08-1","value":"1009"},{"date":"2021-08-31","value":"1009"}]', FALSE, 10, "2021-08-26");



CREATE TABLE `tasks_global` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `notes` json DEFAULT NULL,
  `value` int DEFAULT NULL,
  `deadline` DATETIME DEFAULT NULL,
  `is_complited` BOOLEAN DEFAULT FALSE,

   FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE TABLE `tasks` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `notes` json DEFAULT NULL,
  `value` int DEFAULT NULL,
  `date_of_create` DATE DEFAULT CURRENT_TIMESTAMP,
  `global_task_id` int DEFAULT NULL,
  `deadline` DATETIME DEFAULT NULL,
  `is_complited` BOOLEAN DEFAULT FALSE,

   FOREIGN KEY (user_id) REFERENCES users (id),
   FOREIGN KEY (global_task_id) REFERENCES tasks_global (id)
);