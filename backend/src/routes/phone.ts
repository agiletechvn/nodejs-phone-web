import { validateOrReject } from 'class-validator';
import { classToClass, plainToClass } from 'class-transformer';
import * as fs from 'fs';
import express from 'express';
import multer from 'multer';
import * as uuid from 'uuid';
import createError from 'http-errors';
import { createOne, deleteOne, findAll, findOne, isExist, updateOne } from '../services/phone';
import { catchable } from '../utils';
import { Phone } from '../entities/phone';
import { PhoneUpdateDto } from '../entities/phone.update.dto';
import { PhoneCreateDto } from '../entities/phone.create.dto';

export const router = express.Router();

const STORAGE_DIR = '/usr/src/storage';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, STORAGE_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + file.originalname)
  }
});

const upload = multer({
  storage
});

router.get('/', catchable(async (req, res, next) => {
  const phones = await findAll();
  res.json(phones);
}));

router.post('/', upload.single('imageFile'), catchable(async (req, res, next) => {
  const data = plainToClass(PhoneCreateDto, {
    ...req.body,
    imageFile: req.file,
  });

  try {
    await validateOrReject(data);
  } catch (e) {
    // delete file
    if (data.imageFile) {
      fs.unlink(`${STORAGE_DIR}/${data.imageFile.filename}`, () => { });
    }

    throw e;
  }

  const result = await createOne(plainToClass(Phone, {
    ...data,
    imageFile: undefined,
    imageFileName: req.file.filename
  }));

  res.json(result);
}));

router.get('/:id', catchable(async (req, res, next) => {
  const { id } = req.params;

  const phone = await findOne(id);
  if (!phone) {
    throw new createError.NotFound();
  }

  res.json(phone);
}));

router.put('/:id', upload.single('imageFile'), catchable(async (req, res, next) => {
  const { id } = req.params;

  const oldPhone = await findOne(id);
  if (!oldPhone) {
    throw new createError.NotFound();
  }

  const data = plainToClass(PhoneUpdateDto, {
    ...req.body,
    imageFile: req.file,
  });
  try {
    await validateOrReject(data);
  } catch (e) {
    // delete file
    if (data.imageFile) {
      fs.unlink(`${STORAGE_DIR}/${data.imageFile.filename}`, () => { });
    }

    throw e;
  }

  const patch: any = {
    ...data,
  };

  delete patch.imageFile;

  if (data.imageFile) {
    patch.imageFileName = data.imageFile.filename;
  } else {
    delete patch.imageFileName;
  }

  const result = await updateOne(id, plainToClass(Phone, patch));

  // delete old file
  if (oldPhone) {
    fs.unlink(`${STORAGE_DIR}/${oldPhone.imageFileName}`, () => {});
  }

  res.json(result);
}));

router.delete('/:id', catchable(async (req, res, next) => {
  const { id } = req.params;

  const phone = await findOne(id);
  if (!phone) {
    throw new createError.NotFound();
  }

  await deleteOne(id);

  fs.unlink(`${STORAGE_DIR}/${phone.imageFileName}`, () => {});
  res.status(204).json();
}));