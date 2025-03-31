import { useState, useEffect, useRef } from 'react';
import styles from './WhatsAppChat.module.css';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const sendTo = '+2347011655197';
  const initText = 'Hello, I would like to employ your service';
  const url = `https://api.whatsapp.com/send?phone=${sendTo}&text=${initText}`;

  useEffect(() => {
    // Update time whenever the chat modal is opened
    if (isOpen) {
      const d = new Date();
      const h = d.getHours();
      const m = String(d.getMinutes()).padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const openWhatsApp = () => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div className={styles['whatsapp-click']} onClick={toggleChat}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.4054 3.5875C18.1607 1.3425 15.1714 0.0825 11.9946 0.075C5.4375 0.075 0.0964286 5.4125 0.09 11.9625C0.0882143 14.1375 0.6375 16.2675 1.68214 18.15L0 24L5.97321 22.35C7.78929 23.3025 9.8625 23.8058 11.9839 23.8058H11.9946C18.5464 23.8058 23.8929 18.4675 23.8993 11.9175C23.9057 8.7525 22.65 5.8325 20.4054 3.5875ZM11.9946 21.825C10.2214 21.825 8.48036 21.3375 6.95893 20.4075L6.59464 20.1975L2.86071 21.1275L3.80893 17.4825L3.57857 17.1075C2.55536 15.525 2.01429 13.7625 2.01643 11.9625C2.02286 6.5025 6.5625 2 12.0054 2C14.6411 2.0075 17.1214 3.0375 19.0125 4.935C20.9036 6.8325 21.9268 9.315 21.9225 11.9175C21.9161 17.3825 17.4321 21.825 11.9946 21.825ZM17.4107 14.475C17.1107 14.325 15.6375 13.6 15.3589 13.5C15.0804 13.4 14.8714 13.35 14.6625 13.65C14.4536 13.95 13.8804 14.625 13.6929 14.8325C13.5054 15.0425 13.3179 15.0675 13.0179 14.9175C12.7179 14.7675 11.7482 14.475 10.6179 13.4625C9.73393 12.675 9.13929 11.7075 8.95179 11.4075C8.76429 11.1075 8.92499 10.935 9.08036 10.7775C9.21964 10.635 9.39107 10.4025 9.54643 10.215C9.70179 10.0275 9.75 9.885 9.85 9.675C9.95 9.465 9.9 9.2775 9.825 9.1275C9.75 8.9775 9.15964 7.5 8.9 6.9C8.64643 6.3 8.38929 6.4 8.19107 6.4C8.01429 6.3925 7.80536 6.3925 7.59643 6.3925C7.38751 6.3925 7.05 6.4675 6.77143 6.7675C6.49286 7.0675 5.71607 7.7925 5.71607 9.2775C5.71607 10.7625 6.79821 12.1975 6.95357 12.4075C7.10893 12.6175 9.13214 15.75 12.24 17.025C13.0179 17.3625 13.6232 17.5575 14.0946 17.7C14.8714 17.9475 15.5786 17.9125 16.1411 17.8375C16.7625 17.7525 17.9357 17.1 18.1946 16.4025C18.4536 15.705 18.4536 15.105 18.3786 14.9675C18.3036 14.83 18.0946 14.7525 17.7946 14.6025L17.4107 14.475Z" fill="white"/>
        </svg>
      </div>

      <div 
        className={styles['whatsapp-modal']} 
        style={{ opacity: isOpen ? 1 : 0 }}
      >
        <div className={styles['wm-head']}>
          <h4>DevChi</h4>
          <p className='m-0 p-0 text-sm font-light'>Typically replies instantly</p>
          <span id="closeModal" onClick={toggleChat} style={{ display: isOpen ? 'block' : 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </span>
        </div>
        <div className={styles['wm-body']}>
          <div className={styles['wm-innerchat']}>
            Hi, how can I help you?
            <span id="curTime">{currentTime}</span>
          </div>
        </div>
        <div className={styles['wm-footer']}>
          <button 
            className={styles['wm-chat-block']} 
            onClick={openWhatsApp}
            style={{ display: isOpen ? 'flex' : 'none' }}
          >
            Start Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default WhatsAppChat;
