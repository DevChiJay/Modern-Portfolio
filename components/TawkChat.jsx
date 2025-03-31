import { useEffect } from 'react';

const TawkChat = () => {
  useEffect(() => {
    // Tawk.to initialization
    const initializeTawk = () => {
      var Tawk_API = window.Tawk_API || {};
      var Tawk_LoadStart = new Date();
      
      const s1 = document.createElement('script');
      const s0 = document.getElementsByTagName('script')[0];
      
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6790e6d6825083258e092886/1ii70be0b';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      
      s0.parentNode.insertBefore(s1, s0);
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      initializeTawk();
    }

    // Cleanup function
    return () => {
      // Remove Tawk.to script if component unmounts
      if (typeof window !== 'undefined' && window.Tawk_API) {
        // Check if there's a method to remove the widget
        if (window.Tawk_API.hideWidget) {
          window.Tawk_API.hideWidget();
        }
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default TawkChat;
