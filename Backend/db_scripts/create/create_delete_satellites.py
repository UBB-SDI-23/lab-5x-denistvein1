import psycopg2

conn = psycopg2.connect(database='db', user='user', password='password', host='localhost', port='5432')

sql_statement = """
CREATE OR REPLACE PROCEDURE delete_satellites()
    LANGUAGE plpgsql
AS $$
BEGIN
    TRUNCATE satellite;
    PERFORM setval('satellite_id_seq', 1, false);
END;
$$;
"""

with conn.cursor() as cur:
    cur.execute(sql_statement)

conn.commit()
conn.close()
