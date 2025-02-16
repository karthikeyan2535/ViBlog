import React, { useState, useEffect } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleDarkMode } from '../../store/themeSlice';
import { useDispatch } from 'react-redux';
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const darkMode=useSelector(state=>state.theme.darkMode)
  const dispatch = useDispatch();
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')    }
  }, [darkMode]);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'Profile', slug: '/profile', active: authStatus },
  ];

  return (
    <header className="py-3 shadow fixed mb-20 top-0 bg-opacity-80 backdrop-blur-md z-50">
      <Container theme={`${darkMode ? '' : 'light'}`}>
        <nav className={`${darkMode ? '' : 'light'} flex items-center justify-between`}>
          <div className="mr-4">
            <Link to="/">
              <Logo width="200px" />
            </Link>
          </div>
          <ul className={`flex gap-20 ${authStatus?"":"gap-52"}`}>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="w-32 px-6 py-2 duration-200 bg-[#3a4b74] font-thin hover:bg-blue-300 rounded-full text-lg dark:bg-gray-800 text-white"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          <div className="toggler ml-10 flex items-center">
            <p className="toggler--dark">Dark</p>
            <div
              className={`toggler--slider ${darkMode ? '' : 'light'}`}
              onClick={() => dispatch(toggleDarkMode())}
            >
              <div className="toggler--slider--circle"></div>
            </div>
            <p className="toggler--light">Light</p>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
