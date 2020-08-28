import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProvideDayAvailabilityService';

let listProviderDayhAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayhAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayhAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the day availability from provider ', async () => {
    await fakeAppointmentsRepository.create({
      user_id: '12341234',

      provider_id: 'user',
      date: new Date(2020, 10, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      user_id: '12341234',

      provider_id: 'user',
      date: new Date(2020, 10, 20, 15, 0, 0),
    });
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 10, 20, 11).getTime();
    });

    const availability = await listProviderDayhAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 11,
      day: 20,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 13, available: true },
        { hour: 12, available: true },
      ]),
    );
  });
});
