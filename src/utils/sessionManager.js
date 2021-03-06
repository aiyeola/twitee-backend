import jwt from 'jsonwebtoken';
import redis from 'redis';
import { promisify } from 'util';
import Response from './response';

const redisClient =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
    ? redis.createClient(process.env.REDIS_URL)
    : redis.createClient();

const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

redisClient
  .on('connect', () => console.log('redis connected'))
  .on('error', (error) => console.log(error));

/** Class managing user sessions */
class SessionManager {
  /**
   * Generates a jwt token.
   * @param {object} data - User details.
   * @returns {string} token.
   */
  static generateToken(data) {
    const token = jwt.sign(
      {
        id: data.id,
        email: data.email,
        name: data.name,
      },
      data.secret || process.env.TOKEN_SECRET,
      { expiresIn: '24hr' },
    );
    return token;
  }

  /**
   * Creates a redis session
   * @param {object} data - User details.
   * @param {object} res - response object.
   * @returns {string} token.
   */
  static async createSession(data, res) {
    const result = this.checkToken(data.email);

    const token =
      result === 'null'
        ? Response.conflictError(res, "token doesn't exist")
        : this.generateToken(data);

    const { email } = data;

    redisClient.set(email, token, 'EX', 60 * 60 * 24);
    return token;
  }

  /**
   * Checks if token is in use
   * @param {string} email - User email.
   * @returns {string} result.
   */
  static async checkToken(email) {
    const result = await getAsync(email);
    return result;
  }

  /**
   * Decodes a token
   * @param {object} data - User details.
   * @returns {object} User object
   */
  static decodeToken(data) {
    try {
      return jwt.verify(data.token, data.secret || process.env.TOKEN_SECRET);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Destroys a token.
   * @param {object} data - User details
   * @returns {number} result - 0 || 1
   */
  static async destroyToken(data) {
    const result = delAsync(data.email);
    return result; // result is either 0 or 1 (deleted)
  }

  /**
   * Verifies a token
   * @param {string} token
   * @returns {object} User object
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
      throw error;
    }
  }
}

export default SessionManager;
