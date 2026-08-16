import random
import datetime

departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'General Medicine']
diseases = ['Diabetes', 'Hypertension', 'Asthma', 'Pneumonia', 'COVID-19', 'Dengue', 'Migraine', 'Arthritis', 'Fracture', 'Kidney Stone', 'Heart Disease', 'Stroke', 'Tuberculosis', 'Malaria', 'Viral Fever']

first_names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack', 'Karen', 'Leo', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rachel', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zane', 'William', 'James', 'Benjamin', 'Lucas', 'Henry', 'Alexander', 'Sebastian', 'Matthew', 'David', 'Joseph', 'Emma', 'Charlotte', 'Amelia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Evelyn', 'Harper', 'Luna']
last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall']
cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington']

num_doctors = 50
num_patients = 2000
num_admissions = 15000

def generate_sql():
    sql = []
    
    # Header
    sql.append("CREATE DATABASE  IF NOT EXISTS `Hospital_Analytics_DB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;")
    sql.append("USE `Hospital_Analytics_DB`;")
    sql.append("-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)")
    sql.append("--")
    sql.append("-- Host: 127.0.0.1    Database: Hospital_Analytics_DB")
    sql.append("-- ------------------------------------------------------")
    sql.append("-- Server version	8.0.20\n")
    
    sql.append("/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;")
    sql.append("/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;")
    sql.append("/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;")
    sql.append("/*!50503 SET NAMES utf8 */;")
    sql.append("/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;")
    sql.append("/*!40103 SET TIME_ZONE='+00:00' */;")
    sql.append("/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;")
    sql.append("/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;")
    sql.append("/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;")
    sql.append("/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;\n")
    
    # Department
    sql.append("DROP TABLE IF EXISTS `Department`;")
    sql.append("CREATE TABLE `Department` (")
    sql.append("  `DepartmentID` int NOT NULL,")
    sql.append("  `DepartmentName` varchar(50) DEFAULT NULL,")
    sql.append("  `Floor` int DEFAULT NULL,")
    sql.append("  PRIMARY KEY (`DepartmentID`)")
    sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n")
    sql.append("LOCK TABLES `Department` WRITE;")
    sql.append("/*!40000 ALTER TABLE `Department` DISABLE KEYS */;")
    dept_values = []
    for i, dept in enumerate(departments):
        dept_values.append(f"({i+1},'{dept}',{random.randint(1,5)})")
    sql.append("INSERT INTO `Department` VALUES " + ",".join(dept_values) + ";")
    sql.append("/*!40000 ALTER TABLE `Department` ENABLE KEYS */;")
    sql.append("UNLOCK TABLES;\n")
    
    # Doctor
    sql.append("DROP TABLE IF EXISTS `Doctor`;")
    sql.append("CREATE TABLE `Doctor` (")
    sql.append("  `DoctorID` int NOT NULL,")
    sql.append("  `DoctorName` varchar(100) DEFAULT NULL,")
    sql.append("  `DepartmentID` int DEFAULT NULL,")
    sql.append("  `Experience` int DEFAULT NULL,")
    sql.append("  `Gender` varchar(10) DEFAULT NULL,")
    sql.append("  PRIMARY KEY (`DoctorID`),")
    sql.append("  KEY `fk_doctor_dept` (`DepartmentID`),")
    sql.append("  CONSTRAINT `fk_doctor_dept` FOREIGN KEY (`DepartmentID`) REFERENCES `Department` (`DepartmentID`)")
    sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n")
    sql.append("LOCK TABLES `Doctor` WRITE;")
    sql.append("/*!40000 ALTER TABLE `Doctor` DISABLE KEYS */;")
    doctor_values = []
    genders = ['Male', 'Female']
    for i in range(num_doctors):
        name = "Dr. " + random.choice(first_names) + " " + random.choice(last_names)
        dept_id = random.randint(1, len(departments))
        exp = random.randint(2, 30)
        gen = random.choice(genders)
        doctor_values.append(f"({i+1},'{name}',{dept_id},{exp},'{gen}')")
    for i in range(0, len(doctor_values), 100):
        chunk = doctor_values[i:i+100]
        sql.append("INSERT INTO `Doctor` VALUES " + ",".join(chunk) + ";")
    sql.append("/*!40000 ALTER TABLE `Doctor` ENABLE KEYS */;")
    sql.append("UNLOCK TABLES;\n")
    
    # Patient
    sql.append("DROP TABLE IF EXISTS `Patient`;")
    sql.append("CREATE TABLE `Patient` (")
    sql.append("  `PatientID` int NOT NULL,")
    sql.append("  `PatientName` varchar(100) DEFAULT NULL,")
    sql.append("  `Gender` varchar(10) DEFAULT NULL,")
    sql.append("  `Age` int DEFAULT NULL,")
    sql.append("  `BloodGroup` varchar(5) DEFAULT NULL,")
    sql.append("  `City` varchar(50) DEFAULT NULL,")
    sql.append("  PRIMARY KEY (`PatientID`)")
    sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n")
    sql.append("LOCK TABLES `Patient` WRITE;")
    sql.append("/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;")
    patient_values = []
    bgs = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    for i in range(num_patients):
        name = random.choice(first_names) + " " + random.choice(last_names)
        gen = random.choice(genders)
        # Using a distribution for ages, more adults
        age = int(random.gauss(45, 20))
        if age < 1: age = 1
        if age > 95: age = 95
        bg = random.choice(bgs)
        city = random.choice(cities)
        patient_values.append(f"({i+1},'{name}','{gen}',{age},'{bg}','{city}')")
    for i in range(0, len(patient_values), 200):
        chunk = patient_values[i:i+200]
        sql.append("INSERT INTO `Patient` VALUES " + ",".join(chunk) + ";")
    sql.append("/*!40000 ALTER TABLE `Patient` ENABLE KEYS */;")
    sql.append("UNLOCK TABLES;\n")
    
    # Disease
    sql.append("DROP TABLE IF EXISTS `Disease`;")
    sql.append("CREATE TABLE `Disease` (")
    sql.append("  `DiseaseID` int NOT NULL,")
    sql.append("  `DiseaseName` varchar(100) DEFAULT NULL,")
    sql.append("  `Severity` varchar(20) DEFAULT NULL,")
    sql.append("  PRIMARY KEY (`DiseaseID`)")
    sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n")
    sql.append("LOCK TABLES `Disease` WRITE;")
    sql.append("/*!40000 ALTER TABLE `Disease` DISABLE KEYS */;")
    disease_values = []
    severities = ['Low', 'Medium', 'High', 'Critical']
    for i, dis in enumerate(diseases):
        sev = random.choice(severities)
        disease_values.append(f"({i+1},'{dis}','{sev}')")
    sql.append("INSERT INTO `Disease` VALUES " + ",".join(disease_values) + ";")
    sql.append("/*!40000 ALTER TABLE `Disease` ENABLE KEYS */;")
    sql.append("UNLOCK TABLES;\n")
    
    # Admission
    sql.append("DROP TABLE IF EXISTS `Admission`;")
    sql.append("CREATE TABLE `Admission` (")
    sql.append("  `AdmissionID` int NOT NULL,")
    sql.append("  `PatientID` int DEFAULT NULL,")
    sql.append("  `DoctorID` int DEFAULT NULL,")
    sql.append("  `DiseaseID` int DEFAULT NULL,")
    sql.append("  `AdmitDate` date DEFAULT NULL,")
    sql.append("  `DischargeDate` date DEFAULT NULL,")
    sql.append("  `BillAmount` decimal(10,2) DEFAULT NULL,")
    sql.append("  `PaymentMode` varchar(20) DEFAULT NULL,")
    sql.append("  `RecoveryStatus` varchar(20) DEFAULT NULL,")
    sql.append("  PRIMARY KEY (`AdmissionID`),")
    sql.append("  KEY `fk_adm_pat` (`PatientID`),")
    sql.append("  KEY `fk_adm_doc` (`DoctorID`),")
    sql.append("  KEY `fk_adm_dis` (`DiseaseID`),")
    sql.append("  CONSTRAINT `fk_adm_pat` FOREIGN KEY (`PatientID`) REFERENCES `Patient` (`PatientID`),")
    sql.append("  CONSTRAINT `fk_adm_doc` FOREIGN KEY (`DoctorID`) REFERENCES `Doctor` (`DoctorID`),")
    sql.append("  CONSTRAINT `fk_adm_dis` FOREIGN KEY (`DiseaseID`) REFERENCES `Disease` (`DiseaseID`)")
    sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n")
    sql.append("LOCK TABLES `Admission` WRITE;")
    sql.append("/*!40000 ALTER TABLE `Admission` DISABLE KEYS */;")
    admission_values = []
    pay_modes = ['Cash', 'Credit Card', 'Insurance', 'UPI']
    # skewed recovery status for realism
    rec_status_pool = ['Recovered']*70 + ['Under Treatment']*20 + ['Deceased']*10
    
    start_date = datetime.date(2020, 1, 1)
    end_date = datetime.date(2024, 12, 31)
    delta_days = (end_date - start_date).days
    
    for i in range(num_admissions):
        pat_id = random.randint(1, num_patients)
        doc_id = random.randint(1, num_doctors)
        dis_id = random.randint(1, len(diseases))
        
        admit_days = random.randint(0, delta_days)
        admit_d = start_date + datetime.timedelta(days=admit_days)
        
        # some skew for stay days
        stay_days = int(random.expovariate(1/5.0)) + 1 
        if stay_days > 60: stay_days = 60
        disc_d = admit_d + datetime.timedelta(days=stay_days)
        
        # bill amount based roughly on stay days
        base_bill = stay_days * random.uniform(1000.0, 5000.0)
        bill = round(base_bill + random.uniform(500.0, 5000.0), 2)
        
        pm = random.choice(pay_modes)
        rs = random.choice(rec_status_pool)
        
        admission_values.append(f"({i+1},{pat_id},{doc_id},{dis_id},'{admit_d.strftime('%Y-%m-%d')}','{disc_d.strftime('%Y-%m-%d')}',{bill},'{pm}','{rs}')")
    
    for i in range(0, len(admission_values), 200):
        chunk = admission_values[i:i+200]
        sql.append("INSERT INTO `Admission` VALUES " + ",".join(chunk) + ";")
    sql.append("/*!40000 ALTER TABLE `Admission` ENABLE KEYS */;")
    sql.append("UNLOCK TABLES;\n")
    
    # Bed
    sql.append("DROP TABLE IF EXISTS `Bed`;")
    sql.append("CREATE TABLE `Bed` (")
    sql.append("  `BedID` int NOT NULL,")
    sql.append("  `AdmissionID` int DEFAULT NULL,")
    sql.append("  `Ward` varchar(30) DEFAULT NULL,")
    sql.append("  `BedType` varchar(30) DEFAULT NULL,")
    sql.append("  `Occupied` varchar(10) DEFAULT NULL,")
    sql.append("  PRIMARY KEY (`BedID`),")
    sql.append("  KEY `fk_bed_adm` (`AdmissionID`),")
    sql.append("  CONSTRAINT `fk_bed_adm` FOREIGN KEY (`AdmissionID`) REFERENCES `Admission` (`AdmissionID`)")
    sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n")
    sql.append("LOCK TABLES `Bed` WRITE;")
    sql.append("/*!40000 ALTER TABLE `Bed` DISABLE KEYS */;")
    bed_values = []
    wards = ['General', 'ICU', 'Emergency', 'Private', 'Semi-Private']
    bed_types = ['Standard', 'Oxygen', 'Ventilator']
    for i in range(num_admissions):
        adm_id = i + 1
        ward = random.choice(wards)
        bt = random.choice(bed_types)
        occ = 'Yes' # they are mapped to an admission
        bed_values.append(f"({i+1},{adm_id},'{ward}','{bt}','{occ}')")
        
    for i in range(0, len(bed_values), 200):
        chunk = bed_values[i:i+200]
        sql.append("INSERT INTO `Bed` VALUES " + ",".join(chunk) + ";")
        
    sql.append("/*!40000 ALTER TABLE `Bed` ENABLE KEYS */;")
    sql.append("UNLOCK TABLES;\n")
    
    # Footer
    sql.append("/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;")
    sql.append("/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;")
    sql.append("/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;")
    sql.append("/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;")
    sql.append("/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;")
    sql.append("/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;")
    sql.append("/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;")
    sql.append("/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;")
    
    return "\n".join(sql)

if __name__ == '__main__':
    with open('Hospital_Analytics_DB.sql', 'w', encoding='utf-8') as f:
        f.write(generate_sql())
