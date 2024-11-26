from flask import Flask, redirect, request, jsonify, render_template, url_for
import pymysql

app = Flask(__name__)

db = pymysql.connect(
  host="localhost",
  user="root",
  password="Teja@2323",
  database="job_portal11"
)

@app.route("/")
def home():
  return render_template("home.html")

@app.route("/contact")
def contact():
  return render_template("contact.html")

@app.route("/about")
def about():
  return render_template("about.html")

@app.route("/register", methods=["GET", "POST"])
def register():
  if request.method == "POST":
    data = request.form
    userType = data["userType"]
    username = data["username"]
    email = data["email"]
    password = data["password"]
   
    cursor = db.cursor()
    cursor.execute("INSERT INTO users (userType, username, email, password) VALUES (%s, %s, %s, %s)", (userType, username, email, password))
    db.commit() 
    return jsonify({"success": True}) 
  return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
  if request.method == "POST":
    data = request.form
    username = data["username"]
    password = data["password"]
   
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()
    if user:
      if user[1] == "applicant":
        return redirect(url_for("applicant_dashboard"))
      elif user[1] == "company":
        return redirect(url_for("company_dashboard"))
    return jsonify({"success": False})
  return render_template("login.html")

@app.route("/logout", methods=["POST"])
def logout():
  return jsonify({"success": True})

@app.route("/applicant-dashboard", methods=["GET", "POST"])
def applicant_dashboard():
  if request.method == "POST":
    data = request.form
    name = data.get("name")
    phone = data.get("phone")
    age = data.get("age")
    gender = data.get("gender")
    address = data.get("address")
    qualifications = data.get("qualifications")
    skills = data.get("skills")
    studied_at = data.get("studied_at")
    branch = data.get("branch")
    email = data.get("email")
    interested_domain = data.get("interested_domain")
    user_id = 1  # Replace this with the actual logged-in user ID

    cursor = db.cursor()
    try:
      cursor.execute(
        "INSERT INTO applicant_details (user_id, name, phone, age, gender, address, qualifications, skills, studied_at, branch, email, interested_domain) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (user_id, name, phone, age, gender, address, qualifications, skills, studied_at, branch, email, interested_domain)
      )
      db.commit()

      # Fetch matching job postings
      cursor.execute(
        "SELECT * FROM company_job_postings WHERE job_domain = %s",
        (interested_domain,)
      )
      job_postings = cursor.fetchall()

      return jsonify({"success": True, "job_postings": job_postings})

    except Exception as e:
      db.rollback()
      return jsonify({"success": False, "error": str(e)})

  return render_template("applicant-dashboard.html")

@app.route("/company-dashboard", methods=["GET", "POST"])
def company_dashboard():
    if request.method == "POST":
        data = request.form
        user_id = 1  # Replace with the actual logged-in user ID
        job_title = data.get("job_title")
        job_description = data.get("job_description")
        job_domain = data.get("job_domain")
        qualifications = data.get("qualifications")
        vacancies = data.get("vacancies")

        cursor = db.cursor()
        try:
            # Insert job posting
            cursor.execute("INSERT INTO company_job_postings (user_id, job_title, job_description, job_domain, qualifications, vacancies) VALUES (%s, %s, %s, %s, %s, %s)",
                           (user_id, job_title, job_description, job_domain, qualifications, vacancies))
            db.commit()

            # Fetch all job postings
            cursor.execute("SELECT * FROM company_job_postings")
            job_postings = cursor.fetchall()

            # Prepare job postings for the response
            job_postings_list = []
            for posting in job_postings:
                job_postings_list.append({
                    "job_title": posting[2],
                    "job_description": posting[3],
                    "job_domain": posting[4],
                    "qualifications": posting[5],
                    "vacancies": posting[6]
                })

            return jsonify({"success": True, "job_postings": job_postings_list})
        except Exception as e:
            db.rollback()
            return jsonify({"success": False, "message": str(e)})

    return render_template("company-dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)

