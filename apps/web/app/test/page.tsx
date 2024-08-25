"use client";

import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import QuizComponent from "../../components/QuizComponent";

const Quiz = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

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
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setIsAlertVisible(true);
    }
  };

  const handleAlertClick = () => {
    enterFullScreen();
    setIsAlertVisible(false);
  };

  useEffect(() => {
    enterFullScreen();

    window.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      exitFullScreen();
      window.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <QuizComponent />
      <AlertDialog open={isAlertVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning!</AlertDialogTitle>
            <AlertDialogDescription>
              You must stay in full screen mode to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAlertClick}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Quiz;
