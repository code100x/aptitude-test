import { useEffect } from "react";
import swal from "sweetalert";

const useFullScreen = () => {
  const enterFullScreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch((err) => {
        console.error("Error attempting to enter fullscreen mode:", err);
      });
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.error("Error attempting to exit fullscreen mode:", err);
      });
    }
  };

  useEffect(() => {
    enterFullScreen();

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        swal("Warning!", "You must stay in full screen mode to continue.", "warning").then(() =>
          enterFullScreen(),
        );
      }
    };

    window.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      exitFullScreen();
      window.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
};

export default useFullScreen;
