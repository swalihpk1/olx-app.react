import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { firebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom'


export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(firebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('')
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(username, email, password, phone);
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({ displayName: username }).then(() => {
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(() => {
          setIsLoading(false);
          history.push('/login');
        })
      })
    }).catch((err) => {
      setIsLoading(false);
      setErrMessage(err.message)
      console.error('Signup error:', err);
    })
  };

  return (
    <div>
      {isLoading ?
        <ColorRing />
        :
        <div className="signupParentDiv">
          <img width="200px" height="200px" src={Logo} alt="logo" />
          <p style={{ color: 'red' }}>{errMessage}</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Username</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={username}
              name="name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Email</label>
            <br />
            <input
              className="input"
              type="email"
              id="fname"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="lname">Phone</label>
            <br />
            <input
              className="input"
              type="number"
              value={phone}
              id="lname"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <label htmlFor="lname">Password</label>
            <br />
            <input
              className="input"
              type="password"
              id="lname"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <button type="submit">Signup</button>
          </form>
              <Link to='/login'>Login</Link>
        </div>
      }
    </div>
  );
}
