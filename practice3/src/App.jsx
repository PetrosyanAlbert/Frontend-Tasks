import { useState , useEffect} from 'react'
import './App.css'

export default function App() {
  const [users, setUsers] = useState([]);
  const [gender, setGender] = useState(null);

  useEffect(() => {
    async function fetchUsers(gender = null) {
      let url = "https://randomuser.me/api/?results=10";
      if (gender) url += `&gender=${gender}`;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.results);
    }
    fetchUsers();
  }, [gender]);

  return (
    <div>
      <h1>Random Users</h1>
      <button onClick={() => setGender(null)}>All Users</button>
      <button onClick={() => setGender("male")}>Male</button>
      <button onClick={() => setGender("female")}>Female</button>

      <div>
          {users.map((user, index) => (
            <div key={index}>
              {user.name.first} {user.name.last} {user.gender}
            </div>
          ))}
      </div>
    </div>
  )
}

