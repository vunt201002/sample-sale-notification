import React, {useEffect, useState} from 'react';

export default function useFetchTodoes() {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  async function loadTodoes() {
    try {
      setLoading(true);
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const todoesList = await response.json();
      setTodos(todoesList);
      setFetched(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodoes();
  }, []);

  return {todos, loading, fetched, setTodos};
}
