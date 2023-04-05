import psycopg2

conn = psycopg2.connect(database='db', user='user', password='password', host='localhost', port='5432')

cur = conn.cursor()

cur.execute('CALL delete_satellites()')

conn.commit()

cur.close()
conn.close()
