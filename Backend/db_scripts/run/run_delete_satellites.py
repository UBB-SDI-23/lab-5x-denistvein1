import psycopg2
from constants import DATABASE, USER, PASSWORD, HOST, PORT

conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

try:
    with conn.cursor() as cursor:
        cursor.execute('CALL delete_satellites()')
    conn.commit()

except Exception as e:
    print(e)
finally:
    if conn:
        conn.close()
