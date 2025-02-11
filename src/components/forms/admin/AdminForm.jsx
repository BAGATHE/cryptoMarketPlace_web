import React,{useState} from 'react';
import { Segmented } from 'antd';
import AdminLoginMultiFacteur from './AdminLoginMultiFacteur';

const AdminForm = ()=>{
    const [selectedOption, setSelectedOption] = useState('Login');
    return(
    <div>
        <Segmented 
        options={['Login']}
        onChange={(value) =>{
            setSelectedOption(value);
        }}
        defaultValue="Login"
        />
        <div style={{ marginTop: '20px' }}>
        {selectedOption === 'Login' && <AdminLoginMultiFacteur />}
      </div>
    </div>
    );

}
export default AdminForm;