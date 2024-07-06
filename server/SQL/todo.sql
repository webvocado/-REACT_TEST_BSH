-- Active: 1716818238004@@127.0.0.1@3306@todo

CREATE TABLE `todo` (
  `no` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `status` int DEFAULT '0',
  `reg_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `upd_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`)
) COMMENT='할일';

DROP TABLE IF EXISTS todo;


INSERT INTO `todo` ( `name`, `status` ) VALUES
( '스프링 노트 사기', 0 ),
( '리액트 리액션 찍기', 1 ),
( '취미로 취업하기', 0 ),
( '자소설 초안쓰기', 1 ),
( '코파기 30회', 0 )
;