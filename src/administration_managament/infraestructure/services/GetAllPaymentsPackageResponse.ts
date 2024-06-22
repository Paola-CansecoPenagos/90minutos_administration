import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class GetAllPaymentsPackageResponse {
    private queueName: string = process.env.RABBIT_QUEUE_GET_ALL_PAYMENTS_PACKAGE_RES_ADMINISTRATION || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_ADMINISTRATION_EXCHANGE || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_GET_ALL_PAYMENTS_PACKAGE_RES_ADMINISTRATION || 'default';

    async sendMessage(message: any): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.publish(this.exchangeName, this.routingKey, Buffer.from(JSON.stringify(message)));
            signale.info('Message sent:', message, 'to', this.routingKey);
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
