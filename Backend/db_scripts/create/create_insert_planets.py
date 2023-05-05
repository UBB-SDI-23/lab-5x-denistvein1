import psycopg2
from constants import DATABASE, USER, PASSWORD, HOST, PORT

conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

sql_statement = """
CREATE OR REPLACE PROCEDURE insert_planets(
    num_records integer
) LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO planet(name, radius, temperature, gravity, escape_velocity, orbital_period)
    SELECT
        'Planet_' || i as name,
        round(random() * 10000) + 1000 as radius,
        round(random() * 100) + 100 as temperature,
        round(random() * 15) + 5 as gravity,
        round(random() * 15) + 5 as escape_velocity,
        round(random() * 1000) + 100 as orbital_period
    FROM generate_series(1, num_records) as i;
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
