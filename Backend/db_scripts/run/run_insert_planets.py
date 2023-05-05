import psycopg2
import sys
from constants import DATABASE, USER, PASSWORD, HOST, PORT

conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)


if __name__ == '__main__':
    try:
        with conn.cursor() as cursor:
            cursor.execute('CALL insert_planets({})'.format(sys.argv[1]))
        conn.commit()

    except Exception as e:
        print(e)
    finally:
        if conn:
            conn.close()
