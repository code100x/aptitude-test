import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Button appName="aptitude test" className={styles.secondary}>
          Open alert
    </Button>
  );
}
