import psycopg2
from constants import DATABASE, USER, PASSWORD, HOST, PORT

conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

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

try:
    with conn.cursor() as cursor:
        cursor.execute(sql_statement)
    conn.commit()

except Exception as e:
    print(e)
finally:
    if conn:
        conn.close()