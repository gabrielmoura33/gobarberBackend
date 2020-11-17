import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import { ObjectID } from 'typeorm';
import Notifications from '../../infra/typeorm/schemas/Notifications';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notifications[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notifications> {
    const notification = new Notifications();

    Object.assign(notification, { id: ObjectID, content, recipient_id });

    this.notifications.push(notification);
    return notification;
  }
}
export default FakeNotificationsRepository;
