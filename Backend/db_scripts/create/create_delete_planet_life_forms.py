import psycopg2

conn = psycopg2.connect(database='db', user='user', password='password', host='localhost', port='5432')

sql_statement = """
CREATE OR REPLACE PROCEDURE delete_planet_life_forms()
    LANGUAGE plpgsql
AS $$
BEGIN
    TRUNCATE planet_life_form;
END;
$$;
"""

with conn.cursor() as cur:
    cur.execute(sql_statement)

conn.commit()
conn.close()
