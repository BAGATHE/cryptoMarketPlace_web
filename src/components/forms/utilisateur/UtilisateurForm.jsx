import React,{useState} from 'react';
import { Segmented } from 'antd';
import UtilisateurLoginMultiFacteur from './UtilisateurLoginMultiFacteur';
import InscriptionForm from './InscriptionForm';
const UtilisateurForm = ()=>{
    const [selectedOption, setSelectedOption] = useState('Login');
    return(
    <div>
        <Segmented 
        options={['Login','Inscription']}
        onChange={(value) =>{
            setSelectedOption(value);
        }}
        defaultValue="Login"
        />
        <div style={{ marginTop: '20px' }}>
        {selectedOption === 'Login' && <UtilisateurLoginMultiFacteur />}
        {selectedOption === 'Inscription' && <InscriptionForm />}
      </div>
    </div>
    );

}
export default UtilisateurForm;