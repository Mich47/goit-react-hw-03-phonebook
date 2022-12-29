import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './Phonebook/ContactForm';
import { ContactList } from './Phonebook/ContactList';
import { Filter } from './Phonebook/Filter';
import { Section } from './Phonebook/Section';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  handleSubmitForm = (event, name, number) => {
    event.preventDefault();
    if (this.checkContact(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { id: nanoid(), name: name, number: number },
      ],
    }));
    return true;
  };

  checkContact = newName => {
    const { contacts } = this.state;
    return contacts.some(({ name }) => name === newName);
  };

  filteredContacts = filter => {
    const { contacts } = this.state;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filteredContacts(filter);

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.handleSubmitForm} />
        </Section>
        <Section title="Contacts" headingLevel="h2">
          <Filter filter={filter} onChange={this.handleChange} />
          <ContactList
            contacts={filteredContacts}
            onDelete={this.handleDelete}
          />
        </Section>
      </>
    );
  }
}
