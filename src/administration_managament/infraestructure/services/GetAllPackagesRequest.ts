import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class GetAllPackagesRequest {
    private queueName: string = process.env.RABBIT_QUEUE_GET_ALL_PACKAGES_REQ_ADMINISTRATION || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_ADMINISTRATION_EXCHANGE || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_GET_ALL_PACKAGES_REQ_ADMINISTRATION || 'default';

    async receiveMessage(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.consume(this.queueName, (msg: any) => {
                if (msg) {
                    signale.info('Message received:', msg.content.toString());
                    const content: any = JSON.parse(msg.content.toString());
                    signale.info('Message content:', content);
                    // TODO: Process the message content as needed
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
