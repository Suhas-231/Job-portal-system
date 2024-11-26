create database job_portal11;
drop database job_portal11;
USE job_portal11;
show tables;
drop table users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userType ENUM('applicant', 'company') NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
drop table applicant_details;
CREATE TABLE applicant_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    age INT NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    address TEXT NOT NULL,
    qualifications TEXT NOT NULL,
    skills TEXT NOT NULL,
    studied_at VARCHAR(100) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    interested_domain VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
drop table company_job_postings;
CREATE TABLE company_job_postings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL  ,
    job_title VARCHAR(100) NOT NULL,
    job_description TEXT NOT NULL,
    job_domain VARCHAR(100) NOT NULL,
    qualifications TEXT NOT NULL,
    vacancies INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


ALTER TABLE company_job_postings MODIFY user_id INT NOT NULL;
INSERT INTO users (userType, username, email, password) VALUES
('company', 'testcompany', 'testcompany@example.com', 'securepassword');
INSERT INTO company_job_postings (user_id, job_title, job_description, job_domain, qualifications, vacancies) VALUES
(1, 'Software Engineer', 'Develop and maintain software', 'IT', 'B.Tech in Computer Science', 3);
alter table applicant_details modify user_id int not null;
insert into users (userType, username, email, password)values
('applicant','testid','test@gmail.com','securepassword');
insert into applicant_details ( id, user_id,name, phone, age, gender, address, qualifications, skills, studied_at, branch, email, interested_domain) values
(1,1,'test',987654321,25,'male','dkjdkjahdkajd','b.tech','full_stack_development','knsit','cse','testt@gmail.com','it');
select* from applicant_details;