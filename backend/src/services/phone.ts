import * as database from './database'
import { Phone } from "../entities/phone"

const ENTITY_NAME = 'Phone';

export const createOne = (phone: Phone) => database.createOne(ENTITY_NAME, phone);

export const updateOne = (id: string, phone: Phone) => database.updateOne(ENTITY_NAME, id, phone);

export const deleteOne = (id: string) => database.deleteOne(ENTITY_NAME, id);
export const findOne = (id: string) => database.findOne(ENTITY_NAME, id);

export const findAll = async () => {
  const data = await database.findAll(ENTITY_NAME);
  return data.sort(function(a,b) {return (`${a.name}`.localeCompare(b.name)); } );
};

export const isExist = async (id: string) => {
  const result = await findOne(id);
  return !!result;
}

