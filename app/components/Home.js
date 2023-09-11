// Home.js
"use client"
import React, { useState, useEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import './Home.css'

const Home = () => {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [task, settask] = useState([]);
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  const titlechange = (e) => {
    settitle(e.target.value);
  };

  const descchange = (e) => {
    setdesc(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    settask([...task, { title, desc }]);
    settitle('');
    setdesc('');
  };

  const deletehandler = (i) => {
    let copytask = [...task];
    copytask.splice(i, 1);
    settask(copytask);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  let rendertask = null;

  if (task.length > 0) {
    rendertask = task.map((t, i) => {
      return (
        <div
          key={i}
          className={`task-item flex flex-col rounded-xl mt-3 p-3 w-48 h-auto md:w-96 gap-4 ${isDarkMode ? 'dark' : ''}`}
        >
          <h5 className='text-2xl font-bold'> {t.title} </h5>
          <h5 className='text-sm font-normal'> {t.desc} </h5>
          <button
            onClick={() => {
              deletehandler(i);
            }}
            className='bg-red-500 font-bold w-1/3 py-1 rounded text-white hover:scale-95'
          >
            Delete
          </button>
        </div>
      );
    });
  } else {
    rendertask = (
      <div
        className={`task-item flex w-52 items-center flex-col rounded-xl  p-3 h-auto md:w-96 gap-4 ${isDarkMode ? 'dark' : ''}`}
      >
        <h1>No Task Added Yet...</h1>
      </div>
    );
  }

  return (
    <>
      <nav className={`flex justify-between md:p-10 px-2 py-8 items-center text-center h-10 md:h-20  ${isDarkMode ? 'dark' : ''}`}>
        <h1 className={`text-2xl md:3xl ${isDarkMode ? 'text-light' : 'text-dark'}`}>TODO-LIST</h1>
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={50}
        />
      </nav>
      <div className='flex justify-center flex-col gap-5 md:py-10 py-2 items-center overflow-y-hidden '>
        <h2 className='md:text-3xl text-2xl  font-bold'>Add Task</h2>
        <form onSubmit={submithandler} className='flex gap-5 flex-col'>
          <input
            value={title}
            onChange={titlechange}
            className='md:px-5 md:py-3 px-3 py-2  border-zinc-800 border-4'
            type='text'
            name='title'
            id='title'
            placeholder='Enter title'
            required
          />
          <textarea
            value={desc}
            cols={10}
            rows={5}
            onChange={descchange}
            className='md:px-5 md:py-3 py-2 px-3 border-zinc-800 border-4'
            type='text'
            name='description'
            id='description'
            placeholder='Enter Description'
            required
          />
          <button className='bg-green-500 text-white p-3 hover:scale-95'>
            +ADD+
          </button>
        </form>
        <div className='md:mt-8 mt-4 flex flex-col items-center justify-center '>
          <h1 className='text-3xl font-bold'>Tasks</h1>
          {rendertask}
        </div>
      </div>
      <footer className={`flex items-center justify-center w-full h-10 mt-auto ${isDarkMode ? 'dark' : ''}`}>
        <h3>Made With ❤️ by Mukul Rana</h3>
      </footer>
    </>
  );
};

export default Home;
