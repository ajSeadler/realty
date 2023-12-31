const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name='first last', email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserById = async (userId) => {
    try {
      const { rows: [user] } = await db.query( 
        `
        SELECT *
        FROM users
        WHERE id = $1;
        `,
        [userId]
      );
  
      if (!user) return null;
  
      // Omitting password from the user object
      const sanitizedUser = { ...user };
      delete sanitizedUser.password;
  
      return sanitizedUser;
    } catch (error) {
      throw error;
    }
  };

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserFavorites = async (userId) => {
    try {
      const result = await db.query(`
        SELECT homes.*
        FROM user_favorites
        JOIN homes ON user_favorites.home_id = homes.id
        WHERE user_favorites.user_id = $1;
      `, [userId]);
  
      return result.rows;
    } catch (error) {
      throw error;
    }
  };

  const createUserFavorites = async (userId, homeId) => {
    try {
        await db.query(`
            INSERT INTO user_favorites (user_id, home_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, home_id) DO NOTHING;
        `, [userId, homeId]);

        // You can include additional logic or error handling if needed

    } catch (error) {
        throw error;
    }
};

const deleteUserFavorite = async (userId, homeId) => {
    try {
        await db.query(`
            DELETE FROM user_favorites
            WHERE user_id = $1 AND home_id = $2;
        `, [userId, homeId]);

        // You can include additional logic or error handling if needed

    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getUserById,
    getUserFavorites,
    createUserFavorites,
    deleteUserFavorite
};