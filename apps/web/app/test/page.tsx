"use client";

import React, { useEffect } from "react";
import QuizComponent from "../../components/QuizComponent";
import useFullScreen from "../../hooks/useFullScreen";
import { useRouter } from "next/navigation";

const Quiz = () => {
  const router = useRouter();

  useFullScreen();

  // TODO: Prevent going back

  // disable right click
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // disable all keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const code = event.code;

      if (
        code === "F12" || // F12 for opening DevTools
        event.ctrlKey ||
        event.shiftKey ||
        event.metaKey ||
        event.altKey
      ) {
        console.log("Blocked dev tools shortcut:", { key, code });
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // TODO: Make the API call to register timestamp only if this useEffect does nothing
  // redirects user to the instructions page if the inspect window is open
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const detectConsoleOpen = () => {
      const threshold = 160;
      const isConsoleOpen =
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold;

      if (isConsoleOpen) {
        swal("Warning!", "Inspecting is not allowed!", "warning");
        timeout = setTimeout(() => {
          router.back(); // This will navigate one step back
        }, 1000);
      }
    };
    detectConsoleOpen();

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return <QuizComponent />;
};

export default Quiz;
