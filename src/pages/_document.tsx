import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <Script
          src="https://js.pusher.com/8.2.0/pusher.min.js"
          strategy="beforeInteractive"
        />
      </Head>
      <body>
        <div id="tooltip-root"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
