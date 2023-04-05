import psycopg2

conn = psycopg2.connect(database='db', user='user', password='password', host='localhost', port='5432')

sql_statement = """
CREATE OR REPLACE PROCEDURE delete_life_forms()
    LANGUAGE plpgsql
AS $$
BEGIN
    TRUNCATE life_form CASCADE;
    PERFORM setval('life_form_id_seq', 1, false);
END;
$$;
"""

with conn.cursor() as cur:
    cur.execute(sql_statement)

conn.commit()
conn.close()
