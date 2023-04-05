import psycopg2

conn = psycopg2.connect(database='db', user='user', password='password', host='localhost', port='5432')

sql_statement = """
CREATE OR REPLACE PROCEDURE delete_planets()
    LANGUAGE plpgsql
AS $$
BEGIN
    TRUNCATE planet CASCADE;
    PERFORM setval('planet_id_seq', 1, false);
END;
$$;
"""

with conn.cursor() as cur:
    cur.execute(sql_statement)

conn.commit()
conn.close()
