import { useEffect } from "react";
import styled from "styled-components";
import { signInWithPopup, auth, provider, signOut } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, redirect } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          setUser(user);
          navigate("/home");
        }
      },
      [userName]
    );
  });

  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      signOut(auth)
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <NavIcon href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </NavIcon>
            <NavIcon href="/search">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </NavIcon>
            <NavIcon href="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </NavIcon>
            <NavIcon href="/originals">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </NavIcon>
            <NavIcon href="/movies">
              <img src="/images/movie-icon.svg" alt="HOME" />
              <span>MOVIES</span>
            </NavIcon>
            <NavIcon href="/series">
              <img src="/images/series-icon.svg" alt="HOME" />
              <span>SERIES </span>
            </NavIcon>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown id="dropdown">
              <span onClick={handleAuth}>SignOut</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090613;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

//? when use button and logo saperately
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavIcon = styled.a`
  height: 80%;
  padding: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;

  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
    margin-right: 2px;
  }

  span {
    color: rgb(249, 249, 249);
    font-size: 13px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    padding: 2px 0px;
    white-space: nowrap;
    position: relative;
    top: 2px;

    &::after {
      content: "";
      background: white;
      width: 0%;
      height: 2px;
      display: block;
      margin: auto;
      transition: 0.5s;
    }

    &:hover::after {
      width: 100%;
      transition: 0.5s;
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  letter-spacing: 1.5px;
  padding: 8px 16px;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: 0.5s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    transition: 0.5s;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition: 1s;
    }
  }
`;
export default Header;
