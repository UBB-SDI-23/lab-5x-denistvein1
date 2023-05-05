import psycopg2
from constants import DATABASE, USER, PASSWORD, HOST, PORT

conn = psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

sql_statement = """
CREATE OR REPLACE FUNCTION get_description()
    RETURNS text
AS $$
DECLARE
    random_words text[];
BEGIN
    SELECT array_agg(w ORDER BY random()) INTO random_words FROM unnest(array['A', 'natural', 'satellite', 'is', 'a', 'celestial', 'body', 'that', 'orbits', 'around', 'a', 'planet', 'or', 'a', 'dwarf', 'planet', 'these', 'satellites', 'are', 'often', 'referred', 'to', 'as', 'moons', 'and', 'can', 'range', 'in', 'size', 'from', 'small', 'rocks', 'to', 'massive', 'objects', 'like', 'Saturn', 'moon', 'Titan', 'they', 'are', 'held', 'in', 'orbit', 'by', 'their', 'host', 'planet', 'gravitational', 'pull', 'and', 'can', 'have', 'a', 'variety', 'of', 'features', 'on', 'their', 'surface', 'such', 'as', 'craters', 'mountains', 'and', 'valleys', 'some', 'natural', 'satellites', 'have', 'an', 'atmosphere', 'while', 'others', 'do', 'not', 'they', 'can', 'also', 'have', 'different', 'compositions', 'depending', 'on', 'the', 'materials', 'available', 'during', 'their', 'formation', 'natural', 'satellites', 'play', 'an', 'important', 'role', 'in', 'the', 'study', 'of', 'planetary', 'science', 'and', 'can', 'provide', 'valuable', 'insights', 'into', 'the', 'formation', 'and', 'evolution', 'of', 'their', 'host', 'planets']) w;
    RETURN array_to_string(random_words, ' ');
END;
$$ LANGUAGE plpgsql;
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
