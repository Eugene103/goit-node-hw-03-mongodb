import fs from 'fs/promises'
import path from 'path'
import { nanoid } from 'nanoid'

const contactsPath = path.resolve('models', 'contacts.json')

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
}

export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const checkContact = contacts.find(contact => contact.id === contactId)
    return checkContact || null
}

export const removeContact = async (contactId) => {
    const contacts = await listContacts()
    const index = contacts.findIndex(contact => contact.id === contactId)
    if (index === -1) {
        return null
    }
    const result = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}

export const addContact = async (body) => {
    const contacts = await listContacts()
    const newContacts = {
        id: nanoid(),
        ...body,
    }
    contacts.push(newContacts)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContacts
}

export const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null
    }
    contacts[index] = { ...contacts[index], ...body }
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[index]
}   

