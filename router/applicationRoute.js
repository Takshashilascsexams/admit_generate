const express = require('express');
const User = require('../model/student_db'); // Adjust path as needed
const { importCSVToDatabase } = require('./csvConvert');

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
    res.render('login');
});

appRouter.get('/All-users', async (req, res) => {
    const user = await User.find();
    res.render('allUser', { students: user });
});

appRouter.get('/home', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(200).render(`main`, { user });
        } else {
            console.log('User not found.');
            return res.status(404).redirect('/error');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).redirect('/error');
    }
});

appRouter.get('/error', (req, res) => {
    return res.render('error');
});


//API routes --
appRouter.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            return res.status(200).redirect(`/home?email=${user.email}`);
        } else {
            console.log('User not found.');
            return res.status(404).redirect('/error');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: "Internal Server Issue" });
    }
});


//Inser a user ---
appRouter.post('/api/register', async (req, res) => {
    const { email, DOB, ...rest } = req.body;
    const cleanedUser = {
        ...rest,
        email: email?.trim().toLowerCase(),
        DOB,
        password: (() => {
            if (!DOB) return undefined;
            const normalized = DOB.replace(/[-]/g, '/').trim();
            const parts = normalized.split('/');

            if (parts.length === 3) {
                let [month, day, year] = parts;
                day = day.padStart(2, '0');
                month = month.padStart(2, '0');
                return `${day}${month}${year}`;
            } else {
                return DOB.replace(/\D/g, '');
            }
        })(),
    };
    try {
        const newUser = new User(cleanedUser);
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


appRouter.post('/api/register/csv', async (req, res) => {
    const { csvFilePath } = req.body;
    if (!csvFilePath) {
        return res.status(400).json({ message: 'CSV file path is required' });
    }

    try {
        const result = await importCSVToDatabase('../students_filtered.csv');
        return res.status(201).json({ message: `${result.length} users registered successfully` });
    } catch (error) {
        console.error('CSV import error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = appRouter;