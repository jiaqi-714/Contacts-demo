import logo from './logo.svg';
import './App.css';
import { Contact } from './component/contact';



// Q2: Real world problem 
// Write a responsive “Contacts” application that allows the user to browse their contacts:
// •	Make use of https://jsonplaceholder.typicode.com/ (/users are the contacts)
// •	Use either VueJS, Angular or React
// •	Make it visually appealing
// •	No need to implement Create/Update/Delete
// •	Provide instructions on how to run the code

function App() {
  return (
    <div className="App">
      <Contact />
    </div>
  );
}

export default App;
