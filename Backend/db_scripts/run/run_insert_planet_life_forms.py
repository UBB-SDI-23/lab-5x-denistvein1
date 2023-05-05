import psycopg2
import sys
from constants import DATABASE, USER, PASSWORD, HOST, PORT

conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

try:
    with conn.cursor() as cursor:
        cursor.execute('CALL insert_planet_life_forms({}, {});'.format(sys.argv[1], sys.argv[2]))
    conn.commit()

except Exception as e:
    print(e)
finally:
    if conn:
        conn.close()
