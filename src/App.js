import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/ui/Header';
import CharacterGrid from './components/characters/CharacterGrid';
import Search from './components/ui/Search';
import Pagination from './components/ui/Pagination';

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    const fetchItems = async () => {
      //获取全部演员
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );
      // console.log(result.data);

      setItems(result.data);
      setIsLoading(false);
    };
    fetchItems();
  }, [query]); //query变的时候，useEffect才会改变

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

  //更改页
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="container">
      <Header />
      <Search
        getQuery={q => {
          setQuery(q);
        }}
      />
      <CharacterGrid isLoading={isLoading} items={currentItems} />

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={items.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
