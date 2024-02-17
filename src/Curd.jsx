import React, { useState, useEffect } from 'react';

const Curd = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    hobbies: [],
    course: '',
    address: ''
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ?
        (checked ? [...prevState[name], value] : prevState[name].filter(hobby => hobby !== value)) :
        value
    }));
  };

  const createUser = () => {
    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('User created successfully!');
    setFormData({
      name: '',
      email: '',
      password: '',
      gender: '',
      hobbies: [],
      course: '',
      address: ''
    });
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="main">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <form className='border text-center p-5 mt-5'>
            <label className='pe-4'>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} /><br /><br />

            <label className='pe-4'>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} /><br /><br />

            <label className='pe-3'>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} /><br /><br />


            <label className='pe-3'>Gender:</label>
            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
            <label className='pe-2'>Male</label>
            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
            <label>Female</label><br /><br />


            <label className='pe-3'>Hobbies:</label>
            <input type="checkbox" name="hobbies" value="Reading" checked={formData.hobbies.includes('Reading')} onChange={handleChange} />
            <label className='pe-2'>Reading</label>
            <input type="checkbox" name="hobbies" value="Traveling" checked={formData.hobbies.includes('Traveling')} onChange={handleChange} />
            <label>Traveling</label><br /><br />

            <label className="pe-3">Course:</label>
            <select name="course" value={formData.course} onChange={handleChange}>
              <option value="web-development">Web Development</option>
              <option value="ui-ux-design">UI/UX Design</option>
              <option value="hacking">Hacking</option>
              <option value="java-developer">Java Developer</option>
              <option value="animation">Animation</option>
            </select><br /><br />

            <label>Address:</label>
            <br />
            <textarea name="address" value={formData.address} onChange={handleChange}></textarea><br /><br />

            <button type="button" className='button px-4 py-2 btn btn-outline-success btn-lg' onClick={createUser}>Submit</button>
          </form>

          {/* userss */}
          <div className="print  py-5 mt-5 ms-5 pe-5 text-decoration-none">
            <center>
              <ul>
                {users.map((user, index) => (
                  <li key={index}>
                    <div>Name:  {user.name}</div>
                    <br />
                    <br />
                    <div>Email: {user.email}</div>
                    <br />

                    <div>Password: {user.password}</div>
                    <br />
                    <br />
                    <div>Gender: {user.gender}</div>
                    <br />

                    <div>Hobbies: {user.hobbies}</div>
                    <br />

                    <div>Course: {user.course}</div>
                    <br />
                    <br />
                    <div>Address: {user.address}</div>
                    <br />
                    <button type="button" className='button px-4 py-2 btn btn-outline-danger' onClick={() => deleteUser(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curd;