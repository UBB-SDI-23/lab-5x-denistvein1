import psycopg2
from constants import DATABASE, USER, PASSWORD, HOST, PORT

conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

sql_statement = """
CREATE OR REPLACE PROCEDURE insert_satellites_to_planet(
    planet_id integer,
    batch_size integer,
    num_satellites integer
) LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO satellite(name, description, radius, distance, gravity, escape_velocity, orbital_period, planet_id)
    SELECT
        'Satellite_' || num_satellites + i as name,
        get_description() as description,
        round(random() * 2500) + 500 as radius,
        round(random() * 1000000) + 100000 as distance,
        round(random() * 4) + 1 as gravity,
        round(random() * 4) + 1 as escape_velocity,
        round(random() * 200) + 10 as orbital_period,
        planet_id
    FROM generate_series(1, batch_size) as i;
END;
$$;

CREATE OR REPLACE PROCEDURE insert_satellites(
    num_records integer,
    batch_size integer
) LANGUAGE plpgsql AS $$
DECLARE
    num_planets integer;
    num_satellites integer:= 0;
    planet_id integer:= 1;
BEGIN
    SELECT COUNT(*) INTO num_planets FROM planet;
    WHILE num_satellites < num_records LOOP
        IF planet_id > num_planets THEN
            planet_id:= 1;
        END IF;
        CALL insert_satellites_to_planet(planet_id, batch_size, num_satellites);
        num_satellites:= num_satellites + batch_size;
        planet_id:= planet_id + 1;
    END LOOP;
END;
$$;
"""

try:
    with conn.cursor() as cursor:
        cursor.execute(sql_statement)
    conn.commit()

except Exception as e:
    print(e)
finally:
    if conn:
        conn.close()
