import { connect, ConsumeMessage } from 'amqplib';

export class MessagingService {
    constructor(private amqpUrl: string) {}

    async setup() {
        const connection = await connect(this.amqpUrl);
        const channel = await connection.createChannel();
        await channel.assertQueue('report_updates');

        channel.consume('report_updates', (message: ConsumeMessage | null) => {
            if (message !== null) {
                console.log("Received a message in 'report_updates' queue:", message.content.toString());
                channel.ack(message);
            }
        });
    }
}
