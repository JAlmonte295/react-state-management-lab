import { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';

const initialFighters = [
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
];

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [notification, setNotification] = useState({ text: '', type: '' });
  const [zombieFighters, setZombieFighters] = useState(initialFighters);
  const notificationRef = useRef(null);

  const totalStrength = useMemo(() => team.reduce((acc, fighter) => acc + fighter.strength, 0), [team]);
  const totalAgility = useMemo(() => team.reduce((acc, fighter) => acc + fighter.agility, 0), [team]);

  const handleAddFighter = (fighter) => {
    if (money >= fighter.price) {
      setTeam(prevTeam => [...prevTeam, fighter]);
      setMoney(prevMoney => prevMoney - fighter.price);
      setZombieFighters(prevFighters => prevFighters.filter((f) => f.id !== fighter.id));
      setNotification({ type: 'success', text: `${fighter.name} was added to your team!` });
    } else {
      setNotification({ type: 'error', text: 'Not enough money for that fighter!' });
    } 
  };

  const handleRemoveFighter = (fighter) => {
    setTeam(prevTeam => prevTeam.filter((f) => f.id !== fighter.id));
    setMoney(prevMoney => prevMoney + fighter.price);
    setZombieFighters(prevFighters => [...prevFighters, fighter]);
    setNotification({
      type: 'success',
      text: `${fighter.name} was removed from the team. You got $${fighter.price} back. Team strength reduced by ${fighter.strength}.`
    });
  };

  useEffect(() => {
    if (notification.text) {
      if (notificationRef.current) {
        notificationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
      }
      const timer = setTimeout(() => {
        setNotification({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className='App'>

      <h1><span className="crossed-out">Zombie</span> Mutant Fighters</h1>
      

      <hr />

      <h2>Money: {money}</h2>
      <p>Total Strength: {totalStrength}</p>
      <p>Total Agility: {totalAgility}</p>

      <hr />

      <h2>Your Team</h2>
      {notification.text && <div ref={notificationRef} className={`message ${notification.type}`}>{notification.text}</div>}
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