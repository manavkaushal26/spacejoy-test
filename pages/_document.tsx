import { page } from '@utils/config';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const prod = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const clarity = `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "akeg7k1x06")`;

const gtm = `!function(e,t,a,g,n){e[g]=e[g]||[],e[g].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var m=t.getElementsByTagName(a)[0],r=t.createElement(a);r.async=!0,r.src="https://www.googletagmanager.com/gtm.js?id=${page.gtm}",m.parentNode.insertBefore(r,m)}(window,document,"script","dataLayer");`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en-US">
        <Head>
          <link rel="icon" href="favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          {/* Bing webmaster verification */}
          <meta name="msvalidate.01" content="90B5CCABB531B09607FDE6C5344FC8CF" />
          {prod && <script async defer dangerouslySetInnerHTML={{ __html: clarity }} />}
          {prod && <script async defer dangerouslySetInnerHTML={{ __html: gtm }} />}
        </Head>
        <body>
          {prod && (
            <noscript>
              <iframe
                title="GTM"
                src={`https://www.googletagmanager.com/ns.html?id=${page.gtm}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
