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

// const user_id;

// console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST, GET"],
    credentials: true
}))

// app.use(session({
//     secret: 'my-secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: false
//     }
// }));

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
    saveUninitialized: false, // Zmienione na false ze względów bezpieczeństwa
    cookie: {
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 godziny
    }
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "notes_db"
// })

// const db = mysql.createConnection({
//     host: process.env.DB_HOST || "localhost",
//     user: process.env.DB_USER || "root",
//     password: process.env.DB_PASSWORD || "",
//     database: process.env.DB_NAME || "notes_db",
//     charset: 'utf8mb4'
// });

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     charset: 'utf8mb4'
// });

// db.query((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//         process.exit(1);
//     }
//     console.log('Connected to MySQL database');
// });

// import mysql from 'mysql2/promise';

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
            Message: "Potrzebny jest token, proszę go dostarczć logując się teraz"
        })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    Message: "Błąd uwierzytelnienia"
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

const validateEmail = [
    body('email').trim().isLength({
        min: 6,
        max: 100
    }).escape()
];


app.get('/', verifyUser, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
            errors: errors.array()
        });
    }
    return res.json({
        Status: "Success",
        name: req.name,
        user_id: req.user_id
    })
})




// app.post('/login', (req, res) => {

//     const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

//     db.query(sql, [req.body.email, req.body.password], (err, data) => {
//         if (err) return res.json({
//             Massage: "Błąd po stronie serwera"
//         });
//         if (data.length > 0) {
//             const name = data[0].name;
//             const user_id = data[0].id;
//             const token = jwt.sign({
//                 name
//             }, "our-jsonwebtoken-secret-key", {
//                 expiresIn: '1d'
//             });
//             res.cookie('token', token);
//             req.session.user_id = user_id;
//             return res.json({
//                 Status: "Success"
//             })
//         } else {
//             return res.json({
//                 Message: "No Records existed"
//             });
//         }
//     })
// })

// app.post('/login', validateLogin, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             Message: "Niewłaściwe dane wejściowe",
//             errors: errors.array()
//         });
//     }
//     const sql = 'SELECT * FROM users WHERE email = ?';

//     db.query(sql, [req.body.email], async (err, data) => {
//         if (err) return res.status(500).json({
//             Message: "Błąd po stronie serwera"
//         });

//         if (data.length > 0) {
//             const isPasswordValid = await bcrypt.compare(req.body.password, data[0].password);

//             if (isPasswordValid) {
//                 const name = data[0].name;
//                 const user_id = data[0].id;
//                 const token = jwt.sign({
//                     name,
//                     id: user_id
//                 }, process.env.JWT_SECRET, {
//                     expiresIn: '1d'
//                 });
//                 res.cookie('token', token);
//                 req.session.user_id = user_id;
//                 console.log('USER_ID WYNOSI: ', user_id);
//                 // return res.json({
//                 //     Status: "Success"
//                 // });
//                 return sendSuccess(res, {
//                     message: "Operacja zakończona sukcesem"
//                 });
//             }
//         }
//         return res.json({
//             Message: "Niewłaściwe dane"
//         });
//     });
// });

app.post('/login', validateLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
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
                console.log('USER_ID WYNOSI: ', user_id);

                return sendSuccess(res, {
                    message: "Operacja zakończona sukcesem"
                });
            }
        }

        return res.status(401).json({
            Message: "Niewłaściwe dane"
        });

    } catch (err) {
        console.error('Błąd logowania:', err);
        return res.status(500).json({
            Message: "Błąd po stronie serwera"
        });
    }
});



// app.post('/registration', (req, res) => {
//     const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
//     db.query(sql, [req.body.name, req.body.email, req.body.password], (err, data) => {
//         if (err) return res.json({
//             Massage: "Błąd po stronie serwera"
//         })
//         else {
//             return res.json({
//                 Status: "Success"
//             })
//         }
//     })
// })

// app.post('/registration', validateRegistration, async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 Message: "Niewłaściwe dane wejściowe",
//                 errors: errors.array()
//             });
//         }
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
//         db.query(sql, [req.body.name, req.body.email, hashedPassword], (err, data) => {
//             // if (err) return res.status(500).json({
//             //     Message: "Błąd po stronie serwera"
//             // });
//             // return res.json({
//             //     Status: "Success"
//             // });
//             if (err) return sendError(res, 500, {
//                 message: "Błąd po stronie serwera"
//             });
//             else {
//                 return sendSuccess(res, {
//                     message: "Operacja zakończona sukcesem"
//                 });
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({
//             Message: "Błąd po stronie serwera"
//         });
//     }
// });

app.post('/registration', validateRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
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
                message: "Operacja zakończona sukcesem"
            });
        } else {
            return res.status(500).json({
                Message: "Nie udało się zarejestrować użytkownika"
            });
        }
    } catch (error) {
        console.error("Błąd rejestracji:", error);
        return sendError(res, 500, {
            message: "Błąd po stronie serwera"
        });
    }
});


// app.post('/savetodatabase', validateNote, async (req, res) => {
//     console.log('USER_ID WYNOSI: ', req.session.user_id);

//     // if (!req.session.user_id) {
//     //     return res.json({
//     //         Massage: "Uzytkownik nie jest zalogowany"
//     //     });
//     // }
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             Message: "Niewłaściwe dane wejściowe",
//             errors: errors.array()
//         });
//     }

//     if (!req.session.user_id) {
//         return res.json({
//             Message: "Uzytkownik nie jest zalogowany"
//         });
//     }
//     const user_id = req.session.user_id;



//     const today = new Date();
//     const currentDate = new Date().toISOString().split('T')[0];

//     const sql = 'INSERT INTO notes (user_id, title, note, date) VALUES (?, ?, ?, ?)';
//     db.query(sql, [user_id, req.body.title, req.body.content, currentDate], (err, data) => {
//         // if (err) return res.json({
//         //     Massage: "Błąd po stronie serwera"
//         // })
//         // else {
//         //     return res.json({
//         //         Status: "Success"
//         //     })
//         // }
//         if (err) return sendError(res, 500, {
//             message: "Błąd po stronie serwera"
//         });
//         else {
//             return sendSuccess(res, {
//                 message: "Operacja zakończona sukcesem"
//             });
//         }
//     })
// });

app.post('/savetodatabase', validateNote, async (req, res) => {
    console.log('USER_ID WYNOSI: ', req.session.user_id);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
            errors: errors.array()
        });
    }

    if (!req.session.user_id) {
        return res.status(401).json({
            Message: "Użytkownik nie jest zalogowany"
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
                message: "Operacja zakończona sukcesem"
            });
        } else {
            return res.status(500).json({
                Message: "Nie udało się zapisać notatki"
            });
        }
    } catch (err) {
        console.error("Błąd zapisu notatki:", err);
        return sendError(res, 500, {
            message: "Błąd po stronie serwera"
        });
    }
});


// app.post('/deletenote', (req, res) => {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             Message: "Niewłaściwe dane wejściowe",
//             errors: errors.array()
//         });
//     }

//     if (!req.session.user_id) {
//         return res.json({
//             Message: "Uzytkownik nie jest zalogowany"
//         });
//     }

//     const note_id = req.body.id;

//     const sql = 'DELETE FROM notes WHERE id = ?';
//     db.query(sql, [note_id], (err, data) => {
//         if (err) return sendError(res, 500, {
//             message: "Błąd po stronie serwera"
//         });
//         else {
//             return sendSuccess(res, {
//                 message: "Operacja zakończona sukcesem"
//             });
//         }
//         // if (err) return res.json({
//         //     Massage: "Błąd po stronie serwera"
//         // })
//         // else {
//         //     return res.json({
//         //         Status: "Success"
//         //     })
//         // }
//     })
// })

app.post('/deletenote', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
            errors: errors.array()
        });
    }

    if (!req.session.user_id) {
        return res.status(401).json({
            Message: "Użytkownik nie jest zalogowany"
        });
    }

    const note_id = req.body.id;
    const sql = 'DELETE FROM notes WHERE id = ?';

    try {
        const [result] = await db.query(sql, [note_id]);

        if (result.affectedRows > 0) {
            return sendSuccess(res, {
                message: "Operacja zakończona sukcesem"
            });
        } else {
            return res.status(404).json({
                Message: "Nie znaleziono notatki do usunięcia"
            });
        }
    } catch (err) {
        console.error("Błąd usuwania notatki:", err);
        return sendError(res, 500, {
            message: "Błąd po stronie serwera"
        });
    }
});


app.get('/logout', (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
            errors: errors.array()
        });
    }

    // if (!req.session.user_id) {
    //     return res.json({
    //         Message: "Uzytkownik nie jest zalogowany"
    //     });
    // }
    res.clearCookie('token');
    req.session.destroy();
    // return res.json({
    //     Status: "Success"
    // })
    return sendSuccess(res, {
        message: "Operacja zakończona sukcesem"
    });
})

// app.get('/getAllNotes', async (req, res) => {
//     // if (!req.session.user_id) {
//     //     return res.json({
//     //         Massage: "User is not logged in"
//     //     });
//     // }
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             Message: "Niewłaściwe dane wejściowe",
//             errors: errors.array()
//         });
//     }

//     if (!req.session.user_id) {
//         return res.json({
//             Message: "Uzytkownik nie jest zalogowany"
//         });
//     }

//     const user_id = req.session.user_id;

//     const sql = 'SELECT id AS idOfNote, title AS titleOfNote, note AS noteOfNote, DATE(date) AS dateOfNote, DATE(editedDate) AS editedDateOfNote FROM notes WHERE user_id = ?';

//     db.query(sql, [user_id], (err, data) => {
//         if (err) return sendError(res, 500, {
//             message: "Błąd po stronie serwera"
//         });
//         // if (err) return res.json({
//         //     Massage: "Błąd po stronie serwera"
//         // })
//         if ((data.length > 0) && (user_id > 0)) {
//             // res.json(data);
//             return sendSuccess(res, data);

//             // sendSuccess(res,
//             //     data
//             // );
//         } else {
//             return res.json({
//                 Message: "Nie ma żadnych rekordów"
//             });
//         }
//     })
// })

app.get('/getAllNotes', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
            errors: errors.array()
        });
    }

    if (!req.session.user_id) {
        return res.status(401).json({
            Message: "Użytkownik nie jest zalogowany"
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
            return sendSuccess(res, []); // lub res.json({ success: true, data: [] });
        }

    } catch (err) {
        console.error('Błąd pobierania notatek:', err);
        return sendError(res, 500, {
            message: "Błąd po stronie serwera"
        });
    }
});


// app.post('/editnote', validateEdit, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             Message: "Niewłaściwe dane wejściowe",
//             errors: errors.array()
//         });
//     }

//     if (!req.session.user_id) {
//         return res.json({
//             Message: "Uzytkownik nie jest zalogowany"
//         });
//     }
//     const {
//         id,
//         title,
//         content
//     } = req.body;
//     const editedDateUpdate = new Date().toISOString().split('T')[0];

//     const sql = 'UPDATE notes SET title = ?, note = ?, editedDate = ? WHERE id = ?';
//     db.query(sql, [title, content, editedDateUpdate, id], (err, data) => {
//         // if (err) return res.json({
//         //     Message: "Błąd po stronie serwera"
//         // });
//         // else {
//         //     return res.json({
//         //         Status: "Success"
//         //     });
//         // }
//         if (err) return sendError(res, 500, {
//             message: "Błąd po stronie serwera"
//         });
//         else {
//             return sendSuccess(res, {
//                 message: "Operacja zakończona sukcesem"
//             });
//         }
//     });
// });

app.post('/editnote', validateEdit, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
            errors: errors.array()
        });
    }

    if (!req.session.user_id) {
        return res.status(401).json({
            Message: "Użytkownik nie jest zalogowany"
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
                message: "Operacja zakończona sukcesem"
            });
        } else {
            return res.status(404).json({
                Message: "Nie znaleziono notatki do edycji"
            });
        }
    } catch (err) {
        console.error("Błąd edycji notatki:", err);
        return sendError(res, 500, {
            message: "Błąd po stronie serwera"
        });
    }
});


// app.post("/check-email", validateEmail, async (req, res) => {
// app.post("/check-email", async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             Message: "Niewłaściwe dane wejściowe",
//             errors: errors.array()
//         });
//     }
//     const {
//         email
//     } = req.body;
//     const query = "SELECT * FROM users WHERE email = ?";

//     db.query(query, [email], (err, result) => {
//         if (err) {
//             return res.status(500).json({
//                 Status: "Error",
//                 Message: "Błąd serwera."
//             });
//         }

//         if (result.length > 0) {
//             res.json({
//                 Status: "Taken"
//             }); // Email zajęty
//         }
//     });
// });

app.post("/check-email", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            Message: "Niewłaściwe dane wejściowe",
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
        console.error("Błąd zapytania do bazy:", err);
        return res.status(500).json({
            Status: "Error",
            Message: "Błąd serwera."
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