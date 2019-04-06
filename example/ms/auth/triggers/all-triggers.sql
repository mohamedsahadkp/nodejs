DELIMITER //
DROP TRIGGER IF EXISTS tg_add_device //
CREATE TRIGGER tg_add_device
AFTER INSERT
    ON device FOR EACH ROW
BEGIN
    INSERT INTO activity
    ( user_id, device_id, message, created_date)
    VALUES
    ( NEW.user_id, NEW.id, concat('New device added with device name ',NEW.name), concat(UNIX_TIMESTAMP(), '000'));
END; //
DELIMITER ;

DELIMITER //
DROP TRIGGER IF EXISTS tg_device_issue //
CREATE TRIGGER tg_device_issue
AFTER UPDATE
	ON alerts FOR EACH ROW
BEGIN
	DECLARE roomId INT;
	IF NEW.is_connected != OLD.is_connected THEN
		SELECT r.id INTO roomId FROM room AS r 
		JOIN deviceroommapping AS drm ON r.id = drm.room_id
		JOIN device AS d  ON d.id = drm.device_id
		WHERE d.id = NEW.device_id;	
		IF NEW.is_connected = 0 THEN
			UPDATE room SET device_damage = 1 WHERE room.id = roomId;
		ELSE 
			UPDATE room SET device_damage = 0 WHERE room.id = roomId;
		END IF;
	END IF;
END; //
DELIMITER ;

DELIMITER //
DROP TRIGGER IF EXISTS tg_ready_to_harvest //
CREATE TRIGGER tg_ready_to_harvest
AFTER UPDATE
	ON grocyclestatus FOR EACH ROW
BEGIN	
    IF NEW.current_day > 55 THEN
			UPDATE room SET ready_to_harvest = 1 WHERE room.id = NEW.room_id;
		ELSE 
			UPDATE room SET ready_to_harvest = 0 WHERE room.id = NEW.room_id;
    END IF;
END; //
DELIMITER ;


