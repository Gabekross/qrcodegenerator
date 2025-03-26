import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import styles from "../styles/Home.module.scss";

export default function QRGenerator() {
  const [text, setText] = useState("https://www.fifa.com");
  const [showText, setShowText] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logoDataUrl, setLogoDataUrl] = useState("/logo.png");

  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (qrRef.current) {
      const canvas = await html2canvas(qrRef.current);
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`${styles.generator} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.controls}>
        <label className={styles.label}>
          Foreground Color
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Background Color
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Upload Logo
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </label>
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        className={styles.input}
      />

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={showText}
          onChange={() => setShowText(!showText)}
        />
        Show text below QR
      </label>

      <div className={styles.qrWrapper} ref={qrRef}>
        <QRCode
          value={text}
          size={256}
          bgColor={bgColor}
          fgColor={fgColor}
          logoImage={logoDataUrl}
          logoWidth={50}
          removeQrCodeBehindLogo={true}
          eyeRadius={5}
        />
        {showText && <p className={styles.belowText}>{text}</p>}
      </div>

      <button className={styles.downloadBtn} onClick={handleDownload}>
        Download QR Code
      </button>
    </div>
  );
}
