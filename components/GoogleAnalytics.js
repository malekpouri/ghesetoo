// import siteMetadata from "@/data/siteMetadata";
//
// const GoogleAnalytics = () => {
//   return (
//       <>
//           {/*Global site tag (gtag.js) - Google Analytics */}
//           <script
//               async
//               src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.googleAnalyticsId}`}
//           />
//           <script
//               dangerouslySetInnerHTML={{
//                   __html: `
//                                     window.dataLayer = window.dataLayer || [];
//                                     function gtag(){dataLayer.push(arguments);}
//                                     gtag('js', new Date());
//                                     gtag('config', '${siteMetadata.analytics.googleAnalyticsId}', {
//                                 page_path: window.location.pathname,
//                                 });
//                                 `,
//               }}
//           />
//       </>
//   )
// }
//
// export default GoogleAnalytics
