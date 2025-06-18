// scripts/addUser.ts
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

async function addUser(email: string, plainPassword: string) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const connection = await mysql.createConnection({
        host: "localhost",
        user: "your_db_user",
        password: "your_db_password",
        database: "your_db_name",
    });

    await connection.execute(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hashedPassword]
    );

    console.log("✅ User created successfully");
    await connection.end();
}

addUser("demo@example.com", "password123");
