import AlertContainer from '@/components/AlertContainer.vue';
import faker from 'faker';
import setupComponent from '#/setup-component';
import { Events, eventBus } from '@/events';

const buildAlert = () => ({
  message: faker.name.findName(),
  variant: 'error',
});

const factory = () => setupComponent(AlertContainer, { renderSlots: true });

describe('AlertContainer', () => {
  describe('when SHOW_ALERT event is received', () => {
    it('adds a new alert', async () => {
      const wrapper = factory();
      const alert = buildAlert();

      expect(wrapper.findAllComponents('[data-test="alert"]').length).toEqual(
        0,
      );

      await eventBus.emit(Events.SHOW_ALERT, alert);

      expect(wrapper.findAllComponents('[data-test="alert"]').length).toEqual(
        1,
      );
    });

    it('conjoins an id to the alert', async () => {
      const { vm } = factory();
      const alert = buildAlert();

      await eventBus.emit(Events.SHOW_ALERT, alert);

      expect(vm.alerts[0].id).toBeTruthy();
    });
  });

  describe('when alert emits close', () => {
    it('removes alert from alerts array', async () => {
      const wrapper = factory();

      await eventBus.emit(Events.SHOW_ALERT, buildAlert());

      expect(wrapper.vm.alerts.length).toEqual(1);

      const alert = wrapper.findComponent('[data-test="alert"]');
      await alert.vm.$emit('close', alert.props().id);

      expect(wrapper.vm.alerts.length).toEqual(0);
    });
  });
});
