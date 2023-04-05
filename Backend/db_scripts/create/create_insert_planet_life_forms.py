import psycopg2

conn = psycopg2.connect(database='db', user='user', password='password', host='localhost', port='5432')

sql_statement = """
CREATE OR REPLACE PROCEDURE insert_life_forms_to_planet(
    planet_id integer,
    batch_size integer
) LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO planet_life_form(planet_id, life_form_id, survivability, adaptability)
    SELECT
        planet_id,
        i as life_form_id,
        round(random() * 100) as survivability,
        round(random() * 100) as adaptability
    FROM generate_series(1, batch_size) as i;
END;
$$;

CREATE OR REPLACE PROCEDURE insert_planet_life_forms(
    num_records integer,
    batch_size integer
) LANGUAGE plpgsql AS $$
DECLARE
    num_planets integer;
    num_planet_life_forms integer:= 0;
    planet_id integer:= 1;
BEGIN
    SELECT COUNT(*) INTO num_planets FROM planet;
    WHILE num_planet_life_forms < num_records LOOP
        IF planet_id > num_planets THEN
            planet_id:= 1;
        END IF;
        CALL insert_life_forms_to_planet(planet_id, batch_size);
        num_planet_life_forms:= num_planet_life_forms + batch_size;
        planet_id:= planet_id + 1;
    END LOOP;
END;
$$;
"""

with conn.cursor() as cur:
    cur.execute(sql_statement)

conn.commit()
conn.close()
