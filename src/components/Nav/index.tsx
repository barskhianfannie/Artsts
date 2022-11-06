import { ConnectButton } from '@rainbow-me/rainbowkit';
import  Image  from 'next/image';
import wizard from '../Landing/images/wizard.png'


function NavBar() {
  return (
<div style={{    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: 'full',
    minWidth: 'fit',
    position: 'sticky',
    top: '0',
    background: 'rgba(0,0,0,0.2)', borderBottom:'0.5px solid gray'}}>
      <div style={{    display: 'flex',
    alignItems: 'center',
    marginRight: '300', fontFamily:'sans-serif'}}>
        <Image alt="Artsts" src={wizard} height={50} loading="eager" />
        ARTSTS
      </div>
      <div style={{ display: 'flex', gap: '300', marginTop:'10px', marginBottom:'10px'}}>
    <ConnectButton/>
      </div>
    </div>
  );
}

export default NavBar;