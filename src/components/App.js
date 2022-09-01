import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(``);
      setData(res.data);
    };
  }, [query]);

  return (
    <div>
      <input
        className="search"
        placeholder="Search..."
        onChange={ (e) => setQuery(e.target.value.toLowerCase())}
      />
      {/* {<Table data={ data } />} */}
    </div>
  )
}

export default App;