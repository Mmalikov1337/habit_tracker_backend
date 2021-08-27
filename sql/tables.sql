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