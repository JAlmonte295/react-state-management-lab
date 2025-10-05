import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const totalStrength = team.length > 0 ? team.reduce((acc, fighter) => acc + fighter.strength, 0) : 0;
  const totalAgility = team.length > 0 ? team.reduce((acc, fighter) => acc + fighter.agility, 0) : 0;

  const [zombieFighters, setZombieFighters] = useState([
    {
      id: 1,
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: '/images/survivor.png',
    },
    {
      id: 2,
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: '/images/scavenger.png',
    },
    {
      id: 3,
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: '/images/shadow.png',
    },
    {
      id: 4,
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: '/images/tracker.png',
    },
    {
      id: 5,
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: '/images/sharpshooter.png',
    },
    {
      id: 6,
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: '/images/medic.png',
    },
    {
      id: 7,
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: '/images/engineer.png',
    },
    {
      id: 8,
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: '/images/brawler.png',
    },
    {
      id: 9,
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: '/images/infiltrator.png',
    },
    {
      id: 10,
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: '/images/leader.png',
    },
  ]);

  const handleAddFighter = (fighter) => {
    if (money >= fighter.price) {
      setTeam([...team, fighter]);
      setMoney(money - fighter.price);
      setZombieFighters(zombieFighters.filter((f) => f.id !== fighter.id));
      setMessageType('success');
      setMessage(`${fighter.name} was added to your team!`);
    } else {
      setMessage('Not enough money for that fighter!');
      setMessageType('error');
    } 
  };

  const handleRemoveFighter = (fighter) => {
    setTeam(team.filter((f) => f.id !== fighter.id));
    setMoney(money + fighter.price);
    setZombieFighters([...zombieFighters, fighter]);
    setMessageType('success');
    setMessage( () =>
      `${fighter.name} was removed from the team. You got $${fighter.price} back. Team strength reduced by ${fighter.strength}.`
    )
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className='App'>

      <h1><span className="crossed-out">Zombie</span> Mutant Fighters</h1>
      

      <hr />

      <h2>Money: {money}</h2>
      <p>Total Strength: {totalStrength}</p>
      <p>Total Agility: {totalAgility}</p>

      <hr />

      <h2>Your Team</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      {team.length === 0 ? (
        <p>Pick some team members!</p>
      ) : (
        <ul>
          {team.map((fighter) => (
            <li key={fighter.id}>
              <img src={fighter.img} alt={fighter.name} />
              <h3>{fighter.name}</h3>
              <p>Paid Price: {fighter.price}</p>
              <p>Strength: {fighter.strength}</p>
              <p>Agility: {fighter.agility}</p>
              <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>Available Fighters</h2>
      <ul>
        {zombieFighters.map((fighter) => (
          <li key={fighter.id}>
            <img src={fighter.img} alt={fighter.name} />
            <h3>{fighter.name}</h3>
            <p>Price: {fighter.price}</p>
            <p>Strength: {fighter.strength}</p>
            <p>Agility: {fighter.agility}</p>
            <button onClick={() => handleAddFighter(fighter)}>Add to Team</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App