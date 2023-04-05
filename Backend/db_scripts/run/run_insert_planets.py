import psycopg2
import sys

conn = psycopg2.connect(database='db', user='user', password='password', host='localhost', port='5432')

cur = conn.cursor()

cur.execute('CALL insert_planets({})'.format(sys.argv[1]))

conn.commit()

cur.close()
conn.close()
