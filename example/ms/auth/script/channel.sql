INSERT INTO `piot-stage`.`channel` (`id`, `name`, `unit`, `devicetype_id`, `type`, `low_limit`, `high_limit`) VALUES ('2', 'Temperature', '°F', '1', 'NESTTH-TEMPF', 50,90 );
INSERT INTO `piot-stage`.`channel` (`id`, `name`, `unit`, `devicetype_id`, `type`, `low_limit`, `high_limit`) VALUES ('3', 'Humidity','%' ,'1', 'NESTTH-HUM', 0, 100);
INSERT INTO `piot-stage`.`channel` (`id`, `name`, `devicetype_id`, `type`, `low_limit`, `high_limit`) VALUES ('4', 'pH Value', '2', 'BLUELAB-PH', 1, 14);
INSERT INTO `piot-stage`.`channel` (`id`, `name`, `unit`,`devicetype_id`, `type`,  `low_limit`, `high_limit`) VALUES ('5', 'Water Sprinkler', 'min','3', 'HUNDERPRO-WS', 1, 15);
INSERT INTO `piot-stage`.`channel` (`id`,`name`, `devicetype_id`, `type`,  `low_limit`, `high_limit`) VALUES ('6','Gateway', '4', 'GATEWAY', null,null);



