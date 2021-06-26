CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `stats` json DEFAULT NULL,
  `rang` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `role` int DEFAULT 1,
  `photo` varchar(255) DEFAULT NULL,
  `is_mail_activated` BOOLEAN DEFAULT FALSE,
  `date_of_create` datetime DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (name, mail) VALUES ("asd", "dsa");
CREATE TABLE `habits` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `notes` json DEFAULT NULL,
  `is_healfully` BOOLEAN DEFAULT FALSE,
  `value` int DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `date_of_create` datetime DEFAULT CURRENT_TIMESTAMP
   FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE TABLE `tasks_global` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `notes` json DEFAULT NULL,
  `value` int DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
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
  `date_of_create` datetime DEFAULT CURRENT_TIMESTAMP,
  `global_task_id` int DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `is_complited` BOOLEAN DEFAULT FALSE,

   FOREIGN KEY (user_id) REFERENCES users (id),
   FOREIGN KEY (global_task_id) REFERENCES tasks_global (id)
);