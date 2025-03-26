// pages/index.tsx
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import QRGenerator from "../components/QRGenerator";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>QR Code Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Generate custom QR codes with logo and color options"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>QR Code Generator</h1>
        <QRGenerator />
        <p className={styles.footer}>© 2025 QRCodeApp</p>
      </main>
    </div>
  );
}
