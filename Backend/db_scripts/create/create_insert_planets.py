import psycopg2

conn = psycopg2.connect(database='db', user='user', password='password', host='localhost', port='5432')

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

with conn.cursor() as cur:
    cur.execute(sql_statement)

conn.commit()
conn.close()
