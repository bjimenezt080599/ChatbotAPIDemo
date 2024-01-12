const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/', (req, res) => {
    const menu = `
    <h1>API Main Menu</h1>
    <ul>
        <li><a href="/companies">Companies Section</a></li>
        <li><a href="/members">Members Section</a></li>
        <li><a href="/questions">Questions Section</a></li>
    </ul>
    `;
    res.send(menu);
});     
app.get('/companies', (req, res) => {
    const companies = require('./data/companies.json');
    res.json(companies);
});

app.post('/company', (req, res) => {
    const newCompany = req.body;
    let companies = require('./data/companies.json');

    companies.push(newCompany);

    fs.writeFile('./data/companies.json', JSON.stringify(companies, null, 2), err => {
        if (err) {
            res.status(500).json({ error: 'Error adding the company.' });
        } else {
            res.status(200).json({ message: 'Company added successfully.' });
        }
    });
});

app.delete('/company/:id', (req, res) => {
    const companyIdToDelete = req.params.id;
    let companies = require('./data/companies.json');

    const index = companies.findIndex(company => company.id === companyIdToDelete);
    if (index !== -1) {
        companies.splice(index, 1);

        fs.writeFile('./data/companies.json', JSON.stringify(companies, null, 2), err => {
            if (err) {
                res.status(500).json({ error: 'Error deleting the company.' });
            } else {
                res.status(200).json({ message: 'Company deleted successfully.' });
            }
        });
    } else {
        res.status(404).json({ error: 'Company not found.' });
    }
});

app.get('/members', (req, res) => {
    const members = require('./data/members.json');
    res.json(members);
});

app.post('/member', (req, res) => {
    const newMember = req.body;
    let members = require('./data/members.json');

    members.push(newMember);

    fs.writeFile('./data/members.json', JSON.stringify(members, null, 2), err => {
        if (err) {
            res.status(500).json({ error: 'Error adding the member.' });
        } else {
            res.status(200).json({ message: 'Member added successfully.' });
        }
    });
});
app.get('/questions', (req, res) => {
    const questions = require('./data/questions.json');
    res.json(questions);
});

app.post('/question', (req, res) => {
    const newQuestion = req.body;
    let questions = require('./data/questions.json');

    questions.push(newQuestions);

    fs.writeFile('./data/questions.json', JSON.stringify(questions, null, 2), err => {
        if (err) {
            res.status(500).json({ error: 'Error adding the member.' });
        } else {
            res.status(200).json({ message: 'Member added successfully.' });
        }
    });
});
app.delete('/member/:id', (req, res) => {
    const memberIdToDelete = req.params.id;
    let members = require('./data/members.json');

    const index = members.findIndex(member => member.id === memberIdToDelete);
    if (index !== -1) {
        members.splice(index, 1);

        fs.writeFile('./data/members.json', JSON.stringify(members, null, 2), err => {
            if (err) {
                res.status(500).json({ error: 'Error deleting the member.' });
            } else {
                res.status(200).json({ message: 'Member deleted successfully.' });
            }
        });
    } else {
        res.status(404).json({ error: 'Member not found.' });
    }
});

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
