import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
    <Button appName="aptitude test" className={styles.secondary}>
          Open alert
    </Button>
    <h1 className="text-3xl font-bold underline text-center">
      Hello world!
    </h1>
    </>
  );
}
