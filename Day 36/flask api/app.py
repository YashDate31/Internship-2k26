from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from pathlib import Path
import os


def load_env_file(env_path):
    if not env_path.exists():
        return
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, value = line.split('=', 1)
        os.environ[key.strip()] = value.strip()


app = Flask(__name__) #Create Flask Application

load_env_file(Path(__file__).with_name('.env'))
# MySQL Configuration
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST', 'localhost')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', '')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'studentdb')
app.config['MYSQL_PORT'] = int(os.getenv('MYSQL_PORT', '3307'))
mysql = MySQL(app) #Create MySQL Object
# -----------------------------------
# CREATE API
@app.route('/students', methods=['POST'])
def add_student():
    data = request.json
    if not data:
        return jsonify({"message": "No input data provided"}), 400
    name = data['name']
    email = data['email']
    course = data['course']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO students(name,email,course) VALUES(%s,%s,%s)",(name,email,course))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message":"Student Added Successfully"}), 201
# -----------------------------------
# READ ALL API
# -----------------------------------
@app.route('/students', methods=['GET'])
def get_students():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM students")
    rows = cur.fetchall()
    students=[]
    for row in rows:
        students.append({
            "id":row[0],
            "name":row[1],
            "email":row[2],
            "course":row[3]
        })
    cur.close()
    return jsonify(students)






# -----------------------------------
# READ SINGLE API
# -----------------------------------
@app.route('/students/<int:id>', methods=['GET'])
def get_student(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM students WHERE id=%s",(id,))
    row = cur.fetchone()
    cur.close()
    if row:
        return jsonify({
            "id":row[0],
            "name":row[1],
            "email":row[2],
            "course":row[3]
        })
    return jsonify({"message":"Student Not Found"}), 404







# -----------------------------------
# UPDATE API
# -----------------------------------
@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    data=request.json
    if not data:
        return jsonify({"message": "No input data provided"}), 400
    name=data['name']
    email=data['email']
    course=data['course']
    cur=mysql.connection.cursor()
    cur.execute("UPDATE students SET name=%s,email=%s,course=%s WHERE id=%s",(name,email,course,id))
    mysql.connection.commit()
    if cur.rowcount == 0:
        cur.close()
        return jsonify({"message": "Student Not Found"}), 404
    cur.close()
    return jsonify({"message":"Student Updated Successfully"})



# -----------------5------------------
# DELETE API
# -----------------------------------
@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    cur=mysql.connection.cursor()
    cur.execute("DELETE FROM students WHERE id=%s",(id,))
    mysql.connection.commit()
    if cur.rowcount == 0:
        cur.close()
        return jsonify({"message": "Student Not Found"}), 404
    cur.close()
    return jsonify({"message":"Student Deleted Successfully"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)



