import psycopg2
from constants import DATABASE, USER, PASSWORD, HOST, PORT

conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

sql_statement = """
CREATE OR REPLACE PROCEDURE insert_life_forms(
    num_records integer
) LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO life_form(name, iq, life_span, energy_use, friendly, conscious)
    SELECT
        'LifeForm_' || i as name,
        round(random() * 200) as iq,
        round(random() * 50) as life_span,
        round(random() * 2000) as energy_use,
        CASE WHEN i % 2 = 0 THEN 'no' ELSE 'yes' END as friendly,
        CASE WHEN i % 2 = 0 THEN 'yes' ELSE 'no' END as conscious
    FROM generate_series(1, num_records) as i;
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
