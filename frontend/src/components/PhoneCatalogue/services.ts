import { PhoneInterface } from './Phone';
import { extend } from 'umi-request';

const request = extend({
  prefix: 'http://localhost:3001'
});

export class PhoneController {
  async createPhone(phone: PhoneInterface) {
    const form = new FormData();
    Object.keys(phone).forEach((field) => {
      const val = phone[field as keyof PhoneInterface];
      form.append(field, val);//, val instanceof File ? val.name : undefined);
    });
    const result = await request('/phones', {
      method: 'POST',
      data: form,
    });
    return result;

  }

  async updatePhone(phone: PhoneInterface, id: string) {
    const form = new FormData();
    Object.keys(phone).forEach((field) => {
      const val = phone[field as keyof PhoneInterface];
      form.append(field, val);//, val instanceof File ? val.name : undefined);
    });

    const result = await request(`/phones/${id}`, {
      method: 'PUT',
      data: form,
    });

    return result;
  }

  async deletePhone(id: string) {
    await request.delete(`/phones/${id}`);
  }

  async loadPhones() {
    const result = await request.get('/phones');
    return result;
  }
}
