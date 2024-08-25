import { useEffect } from "react";

const useFullScreen = () => {
  const enterFullScreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch((err) => {
        console.error("Error attempting to enter fullscreen mode:", err);
      });
    }
  };

  useEffect(() => {
    enterFullScreen();
  }, []);
};

export default useFullScreen;
