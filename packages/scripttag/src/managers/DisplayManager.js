import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
import {delay} from '../helpers/delay';
import {replaceSubstring} from '../helpers/replaceSubstring';
import React from 'react';

export default class DisplayManager {
  shopifyDomain = 'https://teststorekjfasdfkj.myshopify.com/';

  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();

    const currentUrl = window.location.href;

    if (settings.allowShow === 'all') {
      const excludedPages = this.filterPage(settings.excludedUrls);
      excludedPages.map(page => {
        currentUrl.includes(page) ? this.fadeOut() : this.displaySetting(settings, notifications);
      });
    } else {
      const includedPages = this.filterPage(settings.includedUrls);
      const excludedPages = this.filterPage(settings.excludedUrls);
      const pages = includedPages.filter(p => !excludedPages.includes(p));

      pages.map(page => {
        currentUrl.includes(page) ? this.displaySetting(settings, notifications) : this.fadeOut();
      });
    }
  }
  constructor() {
    this.notifications = [];
    this.settings = {};
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

  deleteContainer() {
    const popupEl = document.getElementById('Avada-SalePop');
    popupEl.remove();
  }

  async displaySetting(settings, notifications) {
    await delay(settings.firstDelay);
    await this.display({
      notification: notifications[0],
      position: settings.position
    });
    await delay(settings.displayDuration);
    this.fadeOut();
    this.deleteContainer();

    for (let i = 1; i < settings.maxPopsDisplay; i++) {
      this.insertContainer();
      await delay(settings.popsInterval);
      await this.display({
        notification: notifications[i],
        position: settings.position
      });
      await delay(settings.displayDuration);
      this.fadeOut();
      this.deleteContainer();
    }
  }

  filterPage(urlsArr) {
    const urls = urlsArr.split('\n');
    return replaceSubstring(urls, this.shopifyDomain);
  }
}
