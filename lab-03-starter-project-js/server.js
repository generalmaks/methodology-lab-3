const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const host = '0.0.0.0'
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ініціалізація бази даних SQLite
const db = new sqlite3.Database('./todo.db', (err) => {
    if (err) {
        console.error('Помилка підключення до бази даних:', err.message);
    } else {
        console.log('Підключено до SQLite бази даних.');
        db.run(`CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0
    )`);
    }
});

// Маршрут для головної сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Отримати всі задачі
app.get('/todos', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API: Додати нову задачу
app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        res.status(400).json({ error: 'Задача не може бути порожньою' });
        return;
    }
    db.run('INSERT INTO todos (task, completed) VALUES (?, 0)', [task], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, task, completed: 0 });
    });
});

// API: Оновити задачу
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Задачу не знайдено' });
            return;
        }
        res.json({ message: 'Задачу оновлено' });
    });
});

// API: Видалити задачу
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Задачу не знайдено' });
            return;
        }
        res.json({ message: 'Задачу видалено' });
    });
});

// Запуск сервера
app.listen(port, host, () => {
    console.log(`Сервер запущено на http://${host}:${port}`);
});