import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from 'axios';

const backendUrl = `http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}`;

export async function getContacts(query) {
  let contacts = (await axios.get(`${backendUrl}/api/contacts`)).data // localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  return (await axios.post(`${backendUrl}/api/contacts`)).data ?? null
}

export async function getContact(id) {
  return (await axios.get(`${backendUrl}/api/contacts/${id}`)).data ?? null
}

export async function updateContact(id, updates) {
  return (await axios.put(`${backendUrl}/api/contacts/${id}`, updates)).data ?? null
}

export async function deleteContact(id) {
  return (await axios.delete(`${backendUrl}/api/contacts/${id}`)).data ?? null

}