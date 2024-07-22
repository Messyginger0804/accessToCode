import pool from '../config/dbConfig.js';

// Create a user
export const createUser = async (userData) => {
    const { username, email, linkedin } = userData;
    const queryCheckExisting = 'SELECT * FROM users WHERE email = $1 OR linkedin = $2';
    const valuesCheckExisting = [email, linkedin];

    try {
        const checkResult = await pool.query(queryCheckExisting, valuesCheckExisting);
        if (checkResult.rows.length > 0) {
            // User already exists
            return { success: false, message: 'User already exists' };
        }

        const query = `
            INSERT INTO users (username, email, linkedin, created_at) 
            VALUES ($1, $2, $3, NOW()) 
            RETURNING *`;
        const values = [username, email, linkedin];

        const result = await pool.query(query, values);
        const savedUser = result.rows[0];
        console.log('User created:', savedUser);
        return { success: true, user: savedUser };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user' };
    }
};

// Get all users
export const getUsers = async () => {
    const query = 'SELECT * FROM users';

    try {
        const result = await pool.query(query);
        const allUsers = result.rows;
        console.log('Total users:', allUsers.length);
        console.log('All users:', allUsers);
        return allUsers;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

// Get a user by ID
export const getUser = async (id) => {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const values = [id];

    try {
        const result = await pool.query(query, values);
        const user = result.rows[0];
        console.log('User found:', user);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

// Update a user
export const updateUser = async (id, userData) => {
    const { username, email, linkedin } = userData;
    const query = `
    UPDATE users 
    SET username = $1, email = $2, linkedin = $3, updated_at = NOW() 
    WHERE user_id = $4 
    RETURNING *`;
    const values = [username, email, linkedin, id];

    try {
        const result = await pool.query(query, values);
        const updatedUser = result.rows[0];
        console.log('User updated:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};

// Delete a user
export const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE user_id = $1';

    try {
        await pool.query(query, [id]);
        console.log('User deleted');
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

// Pick a random winner (assuming we're still using the same logic)
export const pickRandomWinner = async () => {
    try {
        // Select users who have not won yet (has_won = false)
        const queryAllUsers = 'SELECT * FROM users WHERE has_won = false';
        const resultAllUsers = await pool.query(queryAllUsers);
        const eligibleUsers = resultAllUsers.rows;

        if (eligibleUsers.length === 0) {
            console.log('No eligible users found');
            return null;
        }

        // Pick a random user from the eligible users
        const randomIndex = Math.floor(Math.random() * eligibleUsers.length);
        const randomWinner = eligibleUsers[randomIndex];

        // Update the user's has_won to true
        const queryUpdateWinner = 'UPDATE users SET has_won = true WHERE user_id = $1 RETURNING *';
        const valuesUpdateWinner = [randomWinner.user_id];
        const { rows } = await pool.query(queryUpdateWinner, valuesUpdateWinner);
        const updatedUser = rows[0]; // Assuming only one row is updated

        console.log('Random winner:', updatedUser);
        return updatedUser;
    } catch (error) {
        console.error('Error picking random winner:', error);
        return null;
    }
};

// Get all winners
export const getAllWinners = async () => {
    try {
        const query = 'SELECT * FROM winners';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching winners:', error);
        throw error;
    }
};
