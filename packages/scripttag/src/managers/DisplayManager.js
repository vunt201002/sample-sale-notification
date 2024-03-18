import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import {delay} from '../helpers/delay';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();

    // Your display logic here
    await delay(settings.firstDelay);
    await this.display({notification: notifications[0], position: settings.position});
    await delay(settings.displayDuration);
    this.fadeOut();

    for (let i = 1; i < settings.maxPopsDisplay; i++) {
      this.insertContainer();
      await delay(settings.popsInterval);
      await this.display({notification: notifications[i], position: settings.position});
      await delay(settings.displayDuration);
      this.fadeOut();
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display({notification, position}) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} position={position} />, container);
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
