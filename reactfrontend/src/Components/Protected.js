import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    let Cmp = props.comp

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('user');
        if (!token) {
          navigate('/login');
        }
    }, [])
    

  return (
    <div>
      <Cmp/>
    </div>
  )
}

export default Protected
