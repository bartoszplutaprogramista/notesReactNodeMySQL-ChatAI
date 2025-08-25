import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {
    body,
    validationResult
} from 'express-validator';

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST, GET"],
    credentials: true
}))

const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message
    });
};

const sendSuccess = (res, data = null) => {
    return res.json({
        success: true,
        Status: "Success",
        data
    });
};

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 godziny
    }
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const connectToDatabase = async () => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            charset: 'utf8mb4'
        });

        // Testowe zapytanie
        await db.query('SELECT 1');
        console.log('Connected to MySQL database');

        return db;
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

const db = await connectToDatabase();




const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({
            Message: "We need token please provide it login now"
        })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    Message: "Authentication Error"
                })
            } else {
                req.name = decoded.name;
                req.user_id = decoded.id;
                next();
            }
        })
    }

}

const validateNote = [
    body('title').trim().isLength({
        min: 1,
        max: 100
    }).escape(),
    body('content').trim().isLength({
        min: 1,
        max: 1000
    }).escape()
];

const validateLogin = [
    body('email').trim().isLength({
        min: 1,
        max: 100
    }).escape(),
    body('password').trim().isLength({
        min: 1,
        max: 1000
    }).escape()
];

const validateRegistration = [
    body('name').trim().isLength({
        min: 1,
        max: 100
    }).escape(),
    body('email').trim().isLength({
        min: 1,
        max: 100
    }).escape(),
    body('password').trim().isLength({
        min: 1,
        max: 1000
    }).escape()
];

const validateEdit = [
    body('id').trim().isLength({
        min: 1,
        max: 100
    }).escape(),
    body('title').trim().isLength({
        min: 1,
        max: 100
    }).escape(),
    body('content').trim().isLength({
        min: 1,
        max: 1000
    }).escape()
];

app.get('/', verifyUser, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }
    return res.json({
        Status: "Success",
        name: req.name,
        user_id: req.user_id
    })
})

app.post('/login', validateLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';

    try {
        const [data] = await db.query(sql, [req.body.email]);

        if (data.length > 0) {
            const isPasswordValid = await bcrypt.compare(req.body.password, data[0].password);

            if (isPasswordValid) {
                const name = data[0].name;
                const user_id = data[0].id;
                const token = jwt.sign({
                        name,
                        id: user_id
                    },
                    process.env.JWT_SECRET, {
                        expiresIn: '1d'
                    }
                );

                res.cookie('token', token);
                req.session.user_id = user_id;

                return sendSuccess(res, {
                    Message: "The operation was successful"
                });
            }
        }
        return sendError(res, 401, {
            message: "Incorrect data"
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            Message: "Server Side Error"
        });
    }
});

app.post('/registration', validateRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [
            req.body.name,
            req.body.email,
            hashedPassword
        ]);

        if (result.affectedRows > 0) {
            return sendSuccess(res, {
                message: "The operation was successful"
            });
        } else {
            return res.status(500).json({
                Message: "Failed to register user"
            });
        }
    } catch (error) {
        console.error("Registration Error:", error);
        return sendError(res, 500, {
            message: "Server Side Error"
        });
    }
});

app.post('/savetodatabase', validateNote, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }

    if (!req.session.user_id) {
        return res.status(401).json({
            Message: "User is not logged in"
        });
    }

    const user_id = req.session.user_id;
    const currentDate = new Date().toISOString().split('T')[0];

    const sql = 'INSERT INTO notes (user_id, title, note, date) VALUES (?, ?, ?, ?)';

    try {
        const [result] = await db.query(sql, [
            user_id,
            req.body.title,
            req.body.content,
            currentDate
        ]);

        if (result.affectedRows > 0) {
            return sendSuccess(res, {
                message: "The operation was successful"
            });
        } else {
            return res.status(500).json({
                Message: "Failed to save note"
            });
        }
    } catch (err) {
        console.error("Note saving error:", err);
        return sendError(res, 500, {
            message: "Server Side Error"
        });
    }
});

app.post('/deletenote', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }

    if (!req.session.user_id) {
        return res.status(401).json({
            Message: "User is not logged in"
        });
    }

    const note_id = req.body.id;
    const sql = 'DELETE FROM notes WHERE id = ?';

    try {
        const [result] = await db.query(sql, [note_id]);

        if (result.affectedRows > 0) {
            return sendSuccess(res, {
                message: "The operation was successful"
            });
        } else {
            return res.status(404).json({
                Message: "No note found to delete"
            });
        }
    } catch (err) {
        console.error("Error deleting note:", err);
        return sendError(res, 500, {
            message: "Server Side Error"
        });
    }
});


app.get('/logout', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }
    res.clearCookie('token');
    req.session.destroy();
    return sendSuccess(res, {
        message: "The operation was successful"
    });
})

app.get('/getAllNotes', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }

    if (!req.session.user_id) {
        return res.status(401).json({
            Message: "User is not logged in"
        });
    }

    const user_id = req.session.user_id;

    const sql = `
        SELECT 
            id AS idOfNote, 
            title AS titleOfNote, 
            note AS noteOfNote, 
            DATE(date) AS dateOfNote, 
            DATE(editedDate) AS editedDateOfNote 
        FROM notes 
        WHERE user_id = ?
    `;

    try {
        const [data] = await db.query(sql, [user_id]);

        if (data.length > 0) {
            return sendSuccess(res, data);
        } else {
            return sendSuccess(res, []);
        }

    } catch (err) {
        console.error('Error downloading notes:', err);
        return sendError(res, 500, {
            message: "Server Side Error"
        });
    }
});

app.post('/editnote', validateEdit, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }

    if (!req.session.user_id) {
        return res.status(401).json({
            Message: "User is not logged in"
        });
    }

    const {
        id,
        title,
        content
    } = req.body;
    const editedDateUpdate = new Date().toISOString().split('T')[0];

    const sql = 'UPDATE notes SET title = ?, note = ?, editedDate = ? WHERE id = ?';

    try {
        const [result] = await db.query(sql, [title, content, editedDateUpdate, id]);

        if (result.affectedRows > 0) {
            return sendSuccess(res, {
                message: "The operation was successful"
            });
        } else {
            return res.status(404).json({
                Message: "No note found for editing"
            });
        }
    } catch (err) {
        console.error("Note editing error:", err);
        return sendError(res, 500, {
            message: "Server Side Error"
        });
    }
});

app.post("/check-email", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Invalid input data",
            errors: errors.array()
        });
    }

    const {
        email
    } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";

    try {
        const [result] = await db.query(query, [email]);

        if (result.length > 0) {
            return res.json({
                Status: "Taken"
            }); // Email zajęty
        } else {
            return res.json({
                Status: "Available"
            }); // Email wolny
        }
    } catch (err) {
        console.error("Database query error:", err);
        return res.status(500).json({
            Status: "Error",
            Message: "Server Side Error"
        });
    }
});

app.get('/check-session', (req, res) => {
    if (req.session.user_id) {
        return res.json({
            isLoggedIn: true,
            user_id: req.session.user_id
        });
    } else {
        return res.json({
            isLoggedIn: false
        });
    }
});


app.listen(8081, () => {
    console.log("Running...");
})