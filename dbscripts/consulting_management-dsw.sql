DROP DATABASE IF EXISTS `consulting_management-dsw`;

CREATE DATABASE `consulting_management-dsw`
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';

USE `consulting_management-dsw`;

DROP TABLE IF EXISTS `specialty`;
CREATE TABLE `specialty` (
  `id_specialty` int unsigned NOT NULL AUTO_INCREMENT,
  `name_specialty` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_specialty`)) 
  ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `specialty_price`;
CREATE TABLE `specialty_price` (
	`id_specialty` int unsigned NOT NULL,
	`vig_date_specialty` date NOT NULL,
    `specialty_cost` decimal(9,3) NOT NULL,
    PRIMARY KEY  (`id_specialty`,`vig_date_specialty`),
	CONSTRAINT `fk_specialty_price` FOREIGN KEY (`id_specialty`) REFERENCES `specialty` (`id_specialty`) ON UPDATE CASCADE
)  ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`dni` varchar(20) NOT NULL,
    `firstName` varchar(30) NOT NULL,
	`lastName` varchar(30) NOT NULL,
    `email_user` varchar(50) default NULL,
    `agr` int(2) not NULL,
    `user_type` int(1) NOT NULL,
    `tuition_number` int(5) default 0,
    `id_specialty` int unsigned default null,
    UNIQUE (`tuition_number`),
    primary key (`dni`),
    constraint `fk_doctors` foreign key (`id_specialty`) references `specialty` (`id_specialty`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `treatment`;
CREATE TABLE `treatment` (
	`id_treatment` int unsigned NOT NULL AUTO_INCREMENT,
    `name_treatment` varchar(20) not null,
    `desc_treatment` varchar(20) not null,
    primary key (`id_treatment`))
    ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    
DROP TABLE IF EXISTS `treatment_price`;
CREATE TABLE `treatment_price` (
	`id_treatment` int unsigned NOT NULL,
	`vig_date_treatment` date NOT NULL,
    `treatment_cost` decimal(9,3) NOT NULL,
    PRIMARY KEY  (`id_treatment`,`vig_date_treatment`),
	CONSTRAINT `fk_treatment_price` FOREIGN KEY (`id_treatment`) REFERENCES `treatment` (`id_treatment`) ON UPDATE CASCADE
)  ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `follow_up`;
CREATE TABLE `follow_up` (
	`dni`  varchar(20) NOT NULL,
    `fdate` date not null,
    `obs` varchar(50) not null,
    /*falta hacer tabla follow_up & treatments*/
    primary key (`dni`,`fdate`),
    constraint `fk_follow_up` foreign key (`dni`) references `user` (`dni`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `consulting`;
CREATE TABLE `consulting` (
	`id_consulting` int unsigned not null auto_increment,
    `street_consulting` varchar(15) not null,
    `street_number_consulting` int(4) not null,
    primary key (`id_consulting`)
)ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `doctor-consulting`;
CREATE TABLE `doctor-consulting` (
	`tuition_number` int(5) not null,
    `id_consulting` int unsigned not null,
    primary key (`tuition_number`,`id_consulting`),
    constraint `fk_doctor-consulting_doctor` foreign key (`tuition_number`) references `user` (`tuition_number`) ON update CASCADE,
    constraint `fk_doctor-consulting_consulting` foreign key (`id_consulting`) references `consulting` (`id_consulting`) ON update CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
	`appointment_number` int unsigned not null auto_increment,
	`dni`  varchar(20) NOT NULL,
    `tuition_number` int(5) not null,
    `appointment_date_hour` datetime not null,
    /*assisted???*/
    primary key (`appointment_number`), 
    constraint `fk_appointment_user` foreign key (`dni`) references `user` (`dni`) ON UPDATE CASCADE,
    constraint `fk_appointment_doctor` foreign key (`tuition_number`) references `user` (`tuition_number`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `time_table`;
CREATE TABLE `time_table` (
	`id_time_table` int unsigned not null auto_increment,
    `day_time_attention` datetime not null,
    `vig_date_time_table` date not null,
    `tuition_number` int(5) not null,
    `id_consulting` int unsigned not null,
    primary key (`id_time_table`),
    constraint `fk_time_table_doctor` foreign key (`tuition_number`) references `user` (`tuition_number`) ON update CASCADE,
    constraint `fk_time_table_consulting` foreign key (`id_consulting`) references `consulting` (`id_consulting`) ON update CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


