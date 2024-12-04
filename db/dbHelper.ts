import * as SQLite from 'expo-sqlite';

// Открытие или создание базы данных
const db = SQLite.openDatabaseSync('healthData.db');

// Интерфейсы для таблиц
interface DateRow {
  _id: number;
  date: string;
}

interface HeartRateRow {
  _id: number;
  heart_rate: string;
  _did: number;
}

interface PressureDataRow {
  _id: number;
  pressure: string;
  _did: number;
}

interface SleepingHoursRow {
  _id: number;
  hours: number;
  _did: number;
}

interface StepsDataRow {
  _id: number;
  steps: string;
  _did: number;
}

interface WeightDataRow {
  _id: number;
  weight: string;
  _did: number;
}

// Функция для создания всех таблиц
export const createTables = async (): Promise<void> => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS dates (
      _id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS heart_rate_data (
      _id INTEGER PRIMARY KEY AUTOINCREMENT,
      heart_rate TEXT NOT NULL,
      _did INTEGER,
      FOREIGN KEY (_did) REFERENCES dates(_id)
    );

    CREATE TABLE IF NOT EXISTS pressure_data (
      _id INTEGER PRIMARY KEY AUTOINCREMENT,
      pressure TEXT NOT NULL,
      _did INTEGER,
      FOREIGN KEY (_did) REFERENCES dates(_id)
    );

    CREATE TABLE IF NOT EXISTS sleeping_hours (
      _id INTEGER PRIMARY KEY AUTOINCREMENT,
      hours INTEGER NOT NULL,
      _did INTEGER,
      FOREIGN KEY (_did) REFERENCES dates(_id)
    );

    CREATE TABLE IF NOT EXISTS steps_data (
      _id INTEGER PRIMARY KEY AUTOINCREMENT,
      steps TEXT NOT NULL,
      _did INTEGER,
      FOREIGN KEY (_did) REFERENCES dates(_id)
    );

    CREATE TABLE IF NOT EXISTS weight_data (
      _id INTEGER PRIMARY KEY AUTOINCREMENT,
      weight TEXT NOT NULL,
      _did INTEGER,
      FOREIGN KEY (_did) REFERENCES dates(_id)
    );
  `);
};

// Функция для добавления даты
export const addDate = async (date: string): Promise<void> => {
  await db.runAsync('INSERT INTO dates (date) VALUES (?)', [date]);
};

// Функция для добавления пульса
export const addHeartRate = async (heartRate: string, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO heart_rate_data (heart_rate, _did) VALUES (?, ?)', [heartRate, dateId]);
};

// Функция для добавления давления
export const addPressureData = async (pressure: string, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO pressure_data (pressure, _did) VALUES (?, ?)', [pressure, dateId]);
};

// Функция для добавления количества часов сна
export const addSleepingHours = async (hours: number, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO sleeping_hours (hours, _did) VALUES (?, ?)', [hours, dateId]);
};

// Функция для добавления количества шагов
export const addStepsData = async (steps: string, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO steps_data (steps, _did) VALUES (?, ?)', [steps, dateId]);
};

// Функция для добавления веса
export const addWeightData = async (weight: string, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO weight_data (weight, _did) VALUES (?, ?)', [weight, dateId]);
};

// Функция для получения всех дат
export const getDates = async (): Promise<DateRow[]> => {
  return await db.getAllAsync('SELECT * FROM dates');
};

// Функция для получения данных по пульсу
export const getHeartRateData = async (dateId: number): Promise<HeartRateRow[]> => {
  return await db.getAllAsync('SELECT * FROM heart_rate_data WHERE _did = ?', [dateId]);
};

// Функция для получения данных по давлению
export const getPressureData = async (dateId: number): Promise<PressureDataRow[]> => {
  return await db.getAllAsync('SELECT * FROM pressure_data WHERE _did = ?', [dateId]);
};

// Функция для получения данных по часам сна
export const getSleepingHoursData = async (dateId: number): Promise<SleepingHoursRow[]> => {
  return await db.getAllAsync('SELECT * FROM sleeping_hours WHERE _did = ?', [dateId]);
};

// Функция для получения данных по шагам
export const getStepsData = async (dateId: number): Promise<StepsDataRow[]> => {
  return await db.getAllAsync('SELECT * FROM steps_data WHERE _did = ?', [dateId]);
};

// Функция для получения данных по весу
export const getWeightData = async (dateId: number): Promise<WeightDataRow[]> => {
  return await db.getAllAsync('SELECT * FROM weight_data WHERE _did = ?', [dateId]);
};

// Метод для удаления всех таблиц из базы данных
export const deleteAllTables = async (): Promise<void> => {
  await db.execAsync(`
    DROP TABLE IF EXISTS dates;
    DROP TABLE IF EXISTS heart_rate_data;
    DROP TABLE IF EXISTS pressure_data;
    DROP TABLE IF EXISTS sleeping_hours;
    DROP TABLE IF EXISTS steps_data;
    DROP TABLE IF EXISTS weight_data;
  `);
};

// Метод для повторного создания базы после удаления
export const resetDatabase = async (): Promise<void> => {
  await deleteAllTables();
  await createTables();
};

// Функция для получения шагов с датами
export const getStepsWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT s.steps, d.date
    FROM steps_data s
    JOIN dates d ON s._did = d._id
    WHERE s._did = ?
  `, [dateId]);
};

// Получение данных пульса с датами
export const getHeartRateWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT h.heart_rate, d.date
    FROM heart_rate_data h
    JOIN dates d ON h._did = d._id
    WHERE h._did = ?
  `, [dateId]);
};

// Получение данных по давлению с датами
export const getPressureWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT p.pressure, d.date
    FROM pressure_data p
    JOIN dates d ON p._did = d._id
    WHERE p._did = ?
  `, [dateId]);
};

// Получение данных по часам сна с датами
export const getSleepingHoursWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT s.hours, d.date
    FROM sleeping_hours s
    JOIN dates d ON s._did = d._id
    WHERE s._did = ?
  `, [dateId]);
};

// Получение данных по весу с датами
export const getWeightWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT w.weight, d.date
    FROM weight_data w
    JOIN dates d ON w._did = d._id
    WHERE w._did = ?
  `, [dateId]);
};
