import { openDB } from 'idb';

const initdb = async () =>
  // create a new database
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // create a connection to the database
  const jateDb = await openDB('jate', 1);

  // create a transaction and specify the database
  const tx = jateDb.transaction('jate', 'readwrite');

  // specify the object store
  const store = tx.objectStore('jate');

  // add the content to the database
  const request = store.put({ id:1, value: content });
  
  // confirmation of request
  const result = await request;
  console.log('Content added to database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database')
  // create a connection to the database
  const jateDb = await openDB('jate', 1);

  // create a transaction and specify the database
  const tx = jateDb.transaction('jate', 'readonly');

  // specify the object store
  const store = tx.objectStore('jate');

  // get all the data in the database
  const request = store.getAll();

  // confirmation of request
  const result = await request;
  console.log(result);
  return result;
};

initdb();
