import { environment } from '../environments';
import amqp from 'amqplib/callback_api';

//let mainChannel;

export const createQueue = async (queue, message) => {
    await amqp.connect(environment.AMQP_URL, async (err, conn) => {
        await conn.createChannel(async (error, channel) => {
            await channel.assertQueue(queue, {
                durable: true
            }, async (error) => {
                if (error) {
                    console.log(error);
                }
                else {
                    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
                        persistent: true
                    });
                    setTimeout(() => {
                        channel.close();
                        conn.close();
                    }, 500);
                }
            })
        });
    });
}