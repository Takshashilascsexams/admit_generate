// Student Model
const Student = require('../model/student_db');

// createdDate,name,address,contact,altNumber,email,parentsName,DOB,course,qualification,percentage,caste,Masters

// Simple CSV to Database function
const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://panchnan16:6rhNwNY9ZvIjRscz@komotaadmitdb.nmti9vj.mongodb.net/?retryWrites=true&w=majority&appName=komotaAdmitDb/bn_admit');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};


const importCSVToDatabase = async (csvFilePath) => {
    const students = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream('../students_filtered.csv')
            .pipe(csv())
            .on('data', (row) => {
                const filteredEmail = row.email?.trim().toLowerCase()
                const password = (() => {
                    if (!row.DOB) return undefined;
                    const normalized = row.DOB.replace(/[-]/g, '/').trim();
                    const parts = normalized.split('/');

                    if (parts.length === 3) {
                        let [day, month, year] = parts;
                        day = day.padStart(2, '0');
                        month = month.padStart(2, '0');
                        return `${day}${month}${year}`;
                    } else {
                        return row.DOB.replace(/\D/g, '');
                    }
                })()
                // Create student object from CSV row
                const student = {
                    name: row.name,
                    contact: row.contact,
                    alt_contact: row.altNumber,
                    email: filteredEmail,
                    parent_name: row.parentsName,
                    address: row.address,
                    DOB: row.DOB,
                    rollNo: row.rollNo,
                    percentage_in_degree: row.percentage,
                    qualification: row.qualification,
                    caste: row.caste,
                    createdDate: row.createdDate,
                    password: password,
                };
                students.push(student);
            })
            .on('end', async () => {
                console.log(students[1], ' rows read from CSV file.');
                // try {
                //     // Insert all students into database
                //     const result = await Student.insertMany(students);
                //     console.log(`${result.length} students inserted successfully`);
                //     resolve(result);
                // } catch (error) {
                //     console.error('Database insertion error:', error);
                //     reject(error);
                // }
            })
            .on('error', (error) => {
                console.error('CSV reading error:', error);
                reject(error);
            });
    });
};




module.exports = {
    importCSVToDatabase,
}
