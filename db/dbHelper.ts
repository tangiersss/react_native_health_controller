import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('healthData.db');

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

export const createTables = async (): Promise<void> => {
  const startTime = Date.now();
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
  const endTime = Date.now();
  console.log(`Database initialisation: ${endTime - startTime} ms`);

};

export const addDate = async (date: string): Promise<void> => {
  await db.runAsync('INSERT INTO dates (date) VALUES (?)', [date]);
};

export const addHeartRate = async (heartRate: string, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO heart_rate_data (heart_rate, _did) VALUES (?, ?)', [heartRate, dateId]);
};

export const addPressureData = async (pressure: string, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO pressure_data (pressure, _did) VALUES (?, ?)', [pressure, dateId]);
};

export const addSleepingHours = async (hours: number, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO sleeping_hours (hours, _did) VALUES (?, ?)', [hours, dateId]);
};

export const addStepsData = async (steps: string, dateId: number): Promise<void> => {
  const startTime = performance.now();
  await db.runAsync('INSERT INTO steps_data (steps, _did) VALUES (?, ?)', [steps, dateId]);
  const endTime = performance.now();
  console.log(`Query time: ${(endTime - startTime).toFixed(2)} ms`);
};


export const addWeightData = async (weight: string, dateId: number): Promise<void> => {
  await db.runAsync('INSERT INTO weight_data (weight, _did) VALUES (?, ?)', [weight, dateId]);
};

export const getDates = async (): Promise<DateRow[]> => {
  return await db.getAllAsync('SELECT * FROM dates');
};

export const getHeartRateData = async (dateId: number): Promise<HeartRateRow[]> => {
  return await db.getAllAsync('SELECT * FROM heart_rate_data WHERE _did = ?', [dateId]);
};

export const getPressureData = async (dateId: number): Promise<PressureDataRow[]> => {
  return await db.getAllAsync('SELECT * FROM pressure_data WHERE _did = ?', [dateId]);
};

export const getSleepingHoursData = async (dateId: number): Promise<SleepingHoursRow[]> => {
  return await db.getAllAsync('SELECT * FROM sleeping_hours WHERE _did = ?', [dateId]);
};

export const getStepsData = async (dateId: number): Promise<StepsDataRow[]> => {
  return await db.getAllAsync('SELECT * FROM steps_data WHERE _did = ?', [dateId]);
};

export const getWeightData = async (dateId: number): Promise<WeightDataRow[]> => {
  return await db.getAllAsync('SELECT * FROM weight_data WHERE _did = ?', [dateId]);
};

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

export const resetDatabase = async (): Promise<void> => {
  await deleteAllTables();
  await createTables();
};

export const getStepsWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT s.steps, d.date
    FROM steps_data s
    JOIN dates d ON s._did = d._id
    WHERE s._did = ?
  `, [dateId]);
};

export const getHeartRateWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT h.heart_rate, d.date
    FROM heart_rate_data h
    JOIN dates d ON h._did = d._id
    WHERE h._did = ?
  `, [dateId]);
};

export const getPressureWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT p.pressure, d.date
    FROM pressure_data p
    JOIN dates d ON p._did = d._id
    WHERE p._did = ?
  `, [dateId]);
};

export const getSleepingHoursWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT s.hours, d.date
    FROM sleeping_hours s
    JOIN dates d ON s._did = d._id
    WHERE s._did = ?
  `, [dateId]);
};

export const getWeightWithDates = async (dateId: number): Promise<any[]> => {
  return await db.getAllAsync(`
    SELECT w.weight, d.date
    FROM weight_data w
    JOIN dates d ON w._did = d._id
    WHERE w._did = ?
  `, [dateId]);
};

export const getAllDates = async (): Promise<DateRow[]> => {
  const result = await db.getAllAsync('SELECT * FROM dates ORDER BY date');
  return result as DateRow[];
};
