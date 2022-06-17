import React,{useCallback} from 'react'
import { useLogout } from '../../hooks/useLogout';
export default function Home() {
    const logout = useLogout();
    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);

    return (
  <>
    <div>Home</div>
    <button className='logout' data-cy="logout_btn" onClick={() => handleLogout()}> Uitloggen</button>
  </>
  )
}
