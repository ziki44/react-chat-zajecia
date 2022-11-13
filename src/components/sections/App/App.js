import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ChatMessages from '../../molecules/ChatMessages/ChatMessages';
import MessagesForm from '../../molecules/MessagesForm/MessagesForm';
import WelcomeMessage from '../../atoms/WelcomeMessage/WelcomeMessage';
import Button from '../../atoms/Button/Button';

import './App.css';

// Jak pisac aplikacje krok po kroku
// 1. Tworze HTML
// 2. Mockuje dane (tworze tablice obiektow)
// 3. Robie obsluge renderowania tablicy obiektow
// 4. Dopinam formularz
// 5. Robie dodawanie rzeczy z formularza do tablicy obiektow
// 6. Renderuje nowa tablice

// const messages = [
//   {
//     id: '1',
//     author: 'Damian',
//     message: 'Kurs ALX jest fajny'
//   },
//   {
//     id: '2',
//     author: 'Paweł',
//     message: 'Co dzisiaj zjem?'
//   }
// ]

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInputValue, setMessageInputValue] = useState('')
  const [authorInputValue, setAuthorInputValue] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/messages')
      .then(res => res.json())
      .then(data => {
        // data jest to JSON z serwera
        // console.log(data);
        setMessages(data);
      })

    // Odczytywanie z LS
    // const messagesFromLS = localStorage.getItem('messages');

    // if(messagesFromLS) {
    //   setMessages(JSON.parse(messagesFromLS))
    // }
  // Znak [] oznacza, ze useEffect wykona sie tylko raz, po pierwszym renderze
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const newMessage = {
      id: uuidv4(),
      author: authorInputValue,
      message: messageInputValue
    }

    // concat rowniez sluzy do dodawania do tablicy, ale jest mniej inwazyjna (nie musze zmieniac parametrow, tylko tworzy mi sie nowa tablica);

    const newMessagesArray = messages.concat(newMessage);
    setMessages(newMessagesArray)

    // localStorage.setItem('messages', JSON.stringify(newMessagesArray))

    // Zadanie na teraz:
    // 1. Przy uzyciu fetch i metody POST, wyslij dane na serwer

    fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    })

    // 2*. Przy uzyciu fetch i metody REMOVE usun pojedynczy message z jsona


    // resetowanie wartosci inputow
    setMessageInputValue('');
    setAuthorInputValue('');
  }

  const handleAuthorInputChange = event => {
    // Zawsze zawartosc inputa jest dostepna pod event.target.value
    // console.log(event.target.value);
    setAuthorInputValue(event.target.value) ;
  }

  const handleMessageInputValue = event => {
    setMessageInputValue(event.target.value);
  }

  const handleRemoveMessage = (idToRemove) => {
    // console.log(idToRemove);
    // Usuwanie elementow z tablicy obiektow, w JS robi sie za pomoca funkcji filter.

  // Lapiemy wszystkie elementy, poza tym, ktory zostal klikniety
    const messagesWithRemovedItem = messages.filter(message => {
      return message.id !== idToRemove
    })

    setMessages(messagesWithRemovedItem);

    fetch(`http://localhost:5000/messages/${idToRemove}`, {
      method: 'DELETE'
    })
    // localStorage.setItem('messages', JSON.stringify(messagesWithRemovedItem));
  }

  const removeMessages = () => {
    setMessages([])
    localStorage.removeItem('messages');
  }

  // Zadanie na teraz:
  // 1. Wrzuc <form> do komponentu MessagesForm

  return (
    <div className="App">
      {/* Stworz atom o nazwie WelcomeMessage i przekaz prop o nazwie text */}

      {/* Zwykly component gdzie text jest przekazywane jako props */}
      {/* <WelcomeMessage text="Fill in your message" /> */}

      <WelcomeMessage>
        Fill in your <i>message</i>
      </WelcomeMessage>

      <MessagesForm
        handleSubmit={handleSubmit}
        authorInputValue={authorInputValue}
        handleAuthorInputChange={handleAuthorInputChange}
        messageInputValue={messageInputValue}
        handleMessageInputValue={handleMessageInputValue}
      />

      <WelcomeMessage>
        My messages
      </WelcomeMessage>

      {/* messagesFromApp jest to nazwa naszego props */}
      <ChatMessages
        messagesFromApp={messages}
        handleRemoveMessageFromApp={handleRemoveMessage}
      />
      <Button handleClick={removeMessages}>
        Remove messages
      </Button>
    </div>
  );
}

// Zadanie na teraz:

// 1. Pod lista zadan, dodaj przycisk RemoveMessages.
// 2. Jesli klikniesz w przycisk, to usun wszystkie wiadomosci z chatu i LS
// 3. Stworz atom o nazwie Button i wywolaj go w App.js
// 4*. Uzyj tego samego atomu w komponencie ChatMessages i MessagesList


export default App;