import redis from 'redis';
import util from 'util';
import * as uuid from 'uuid';

const connection = redis.createClient({
  url: process.env.REDIS_URL || 'redis://redis_svc'
});

const getKeys = util.promisify(connection.keys).bind(connection);
const getValue = util.promisify(connection.get).bind(connection);
const setValue = util.promisify(connection.set).bind(connection);
const delByKey = (id: string) => new Promise<void>((resolve, reject) => connection.del(id, x => {
  if (x) return reject(x);
  resolve();
}));

export const findOne = async (entityName: string, id: string) => {
  const result = await getValue(`${entityName}.${id}`);
  if (result) {
    return JSON.parse(result);
  }

  return null;
}

export const findAll = async (entityName: string) => {
  const keys = await getKeys(`${entityName}.*`);
  const items = await Promise.all(keys.map((key) => {
    const [entity, id] = key.split('.');
    return findOne(entity, id);
  }));

  return items.filter(s => !!s);
}

export const createOne = async (entityName: string, item: any) => {
  const id = uuid.v4();

  const result = {
    ...item,
    id
  }

  await setValue(`${entityName}.${id}`, JSON.stringify(result));
  return result;
}

export const updateOne = async (entityName: string, id: string, item: any) => {
  const value = await findOne(entityName, id);
  if (value) {
    const result = {
      ...value,
      ...item,
      id,
    };

    await setValue(`${entityName}.${id}`, JSON.stringify(result));
    return result;
  }

  throw new Error('Entity is not found');
}

export const deleteOne = (entityName: string, id: string) => delByKey(`${entityName}.${id}`);