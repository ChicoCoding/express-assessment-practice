import express from "express";
import Contact from "../models/Contact";

const contacts: Contact[] = [
  {
    fullname: { firstName: "John", lastName: "Doe" },
    phoneNumber: 4234147878,
    isFavorite: false,
    id: 1,
  },
  {
    fullname: { firstName: "Jane", lastName: "Doe" },
    phoneNumber: 4234147876,
    isFavorite: false,
    id: 2,
  },
  {
    fullname: { firstName: "Grampa", lastName: "Joe" },
    phoneNumber: 9398087072,
    isFavorite: false,
    id: 3,
  },
];

let nextId = 4;
const contactsRouter = express.Router();

// endpoints here
contactsRouter.get("/contacts", (req, res) => {
  res.status(200);
  res.json(contacts);
});

contactsRouter.get("/contacts/:phone", (req, res) => {
  const numToFind: number = +req.params.phone;
  const foundPhone: Contact | undefined = contacts.find(
    (item) => item.phoneNumber === numToFind
  );
  if (foundPhone !== undefined) {
    res.status(200);
    res.json(foundPhone);
  } else {
    res.status(404);
    res.json({ message: `No contact with with number ${numToFind} was found` });
  }
});

contactsRouter.post("/contacts", (req, res) => {
  const newItem: Contact = req.body;
  newItem.id = nextId;
  nextId = nextId + 1;
  contacts.push(newItem);
  res.status(201);
  res.json(newItem);
});

contactsRouter.put("/contacts/:id", (req, res) => {
  const idToUpdate: number = +req.params.id;
  const udpdatedItem: Contact = req.body;
  const foundIndex: number = contacts.findIndex((item) => {
    return item.id === idToUpdate;
  });
  if (foundIndex !== -1) {
    contacts[foundIndex] = udpdatedItem;
    res.status(200);
    res.json(udpdatedItem);
  } else {
    res.status(404);
    res.json({ message: `contact with id ${idToUpdate} couldn't be found` });
  }
});

contactsRouter.delete("/contacts/:id", (req, res) => {
  const idToDelete: number = +req.params.id;
  const foundIndex: number = contacts.findIndex((item) => {
    return item.id === idToDelete;
  });
  if (foundIndex !== -1) {
    contacts.splice(foundIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404);
    res.json({ message: `contact with id ${idToDelete}couldn't be found` });
  }
});

export default contactsRouter;
