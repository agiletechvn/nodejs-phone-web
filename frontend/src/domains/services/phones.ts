import { PATHS } from './../apis/index';
import BE from "../apis";
import { PhoneInterface } from "../entities/phones";

export const createPhone = async (phone: PhoneInterface) => {
    const form = new FormData();
    Object.keys(phone).forEach((field) => {
      const val = phone[field as keyof PhoneInterface];
      form.append(field, val);//, val instanceof File ? val.name : undefined);
    });

    return BE.post(PATHS.PHONE_CREATE, {
      data: form,
    });
  }

export const getPhones = async () => BE.get(PATHS.PHONE_LIST);

export const deletePhone = async (id: number) => BE.delete(PATHS.PHONE_DELETE(id));

export const updatePhone = async (phone: PhoneInterface, id: number) => {
  const form = new FormData();
  Object.keys(phone).forEach((field) => {
    const val = phone[field as keyof PhoneInterface];
    form.append(field, val);//, val instanceof File ? val.name : undefined);
  });

  const result = await BE.put(PATHS.PHONE_UPDATE(id), {
    data: form,
  });

  return result;
}