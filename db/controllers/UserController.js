import { User } from '../model';
import { createQueue } from '../../amqp';
import { environment } from '../../environments';

export default class UserController {

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * 
     */
    static async create(req, res) {
        await User.create(req.body).then((user) => {
            res.status(200).json(user);
        }).catch((reason) => {
            if (reason === res.error) {
                res.status(reason.status).json(reason);
                console.log(reason);
            }
            else {
                res.status(500).json(reason);
                console.log(reason);
            }
        });
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    static async createProfile(req, res) {
        const obj = req.body;
        obj.user_id = req.query.id;
        console.log(obj);
        await createQueue(environment.QUEUE, obj);
        await res.status(200).json({
            status: 200,
            message: 'Profile created'
        })
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res
     */
    static async login(req, res) {
        await User.findOne({username: req.query.username}, {}, (err, doc) => {
            if (err) res.status(err.status || 500).json({
                message: err.message
            });
            if (doc) {
                const { password } = req.query;
                doc.checkPassword(res, password);
            }
            else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
        });
    }
}