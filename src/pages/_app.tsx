import Layout from "../components/layout/Layout";
import Head from "next/head";
import "../styles/theme.css";
import "../styles/utils.css";
import AxiosInstanceProvider from "@/mk/contexts/AxiosInstanceProvider";
import axiosInterceptors from "@/mk/interceptors/axiosInterceptors";
import AuthProvider from "@/mk/contexts/AuthProvider";
import PusherContextProvider from "@/mk/contexts/PusherContext";

function MyApp({ Component, pageProps }: any) {
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#00000" />
      </Head>
      <AuthProvider noAuth={Component.noAuth}>
        <PusherContextProvider>
          <div
            id="portal-root"
            style={{
              position: "absolute",
              overflow: "visible",
              zIndex: 9999,
              width: "100%",
            }}
          ></div>
          <Layout title={Component.title}>
            <Component {...pageProps} />
          </Layout>
        </PusherContextProvider>
      </AuthProvider>
    </AxiosInstanceProvider>
  );
}

export default MyApp;
