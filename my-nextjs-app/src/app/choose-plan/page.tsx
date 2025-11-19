// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ChoosePlan() {
//   const router = useRouter();
//   const [openFaq, setOpenFaq] = useState<number | null>(0); 

//   const toggleFaq = (index: number) => {
//     setOpenFaq(openFaq === index ? null : index);
//   };

  

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
//       {/* Hero Section */}
//       <section style={{
//         backgroundColor: '#032b41',
//         padding: '30px 20px 0px',
//         position: 'relative',
//         overflow: 'visible',
//         width: '100%',
//         borderBottomLeftRadius: '20% 35%',
//         borderBottomRightRadius: '20% 35%'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto',
//           textAlign: 'center',
//           position: 'relative',
//           zIndex: 1
//         }}>
//           {/* Main Heading */}
//           <h1 style={{
//             fontSize: '48px',
//             fontWeight: 'bold',
//             color: 'white',
//             marginBottom: '24px',
//             lineHeight: '1.2'
//           }}>
//             Get unlimited access to many<br />amazing books to read
//           </h1>

//           {/* Subheading */}
//           <p style={{
//             fontSize: '20px',
//             color: 'white',
//             marginBottom: '60px',
//             opacity: 0.9
//           }}>
//             Turn ordinary moments into amazing learning opportunities
//           </p>

//           {/* Illustration - Arch Circle */}
//           <div style={{
//            width: '370px',
//             height: '300px',
//             margin: '0 auto',
//             backgroundColor: 'white',
//             borderTopLeftRadius: '170px',
//             borderTopRightRadius: '170px',
//             borderBottomLeftRadius: '0',
//             borderBottomRightRadius: '0',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '40px',
//             position: 'relative',
//             bottom: '-2px'
//           }}>
//             <Image 
//               src="/pricing-top.png" 
//               alt="Pricing illustration"
//               width={320}
//               height={320}
//               style={{ objectFit: 'contain', borderRadius: '50%' }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section style={{
//         padding: '80px 40px',
//         backgroundColor: 'white'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto'
//         }}>
//           {/* Features Grid */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//             gap: '60px',
//             marginBottom: '60px'
//           }}>
//             {/* Feature 1 */}
//             <div style={{ textAlign: 'center' }}>
//               <div style={{
//                 width: '80px',
//                 height: '80px',
//                 margin: '0 auto 24px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 <svg width="80" height="80" viewBox="0 0 1024 1024" fill="#032b41">
//                     <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"></path>
//                 </svg>
//               </div>
//               <div style={{ fontSize: '20px', color: '#032b41', lineHeight: '1.6' }}>
//                     <span style={{ fontWeight: '600' }}>Key ideas in few min</span> with many books to read
//                 </div>
//             </div>

//             {/* Feature 2 */}
//             <div style={{ textAlign: 'center' }}>
//               <div style={{
//                 width: '80px',
//                 height: '80px',
//                 margin: '0 auto 24px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 <svg width="80" height="80" viewBox="0 0 24 24" fill="#032b41">
//                   <path d="M21 3v2c0 3.866-3.134 7-7 7h-1v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-3c0-3.866 3.134-7 7-7h3zM5.5 2c2.529 0 4.765 1.251 6.124 3.169C10.604 6.51 10 8.185 10 10v1h-.5C5.358 11 2 7.642 2 3.5V2h3.5z"></path>
//                 </svg>
//               </div>
//               <div style={{ fontSize: '20px', color: '#032b41', lineHeight: '1.6' }}>
//                     <span style={{ fontWeight: '600' }}>3 million</span> people growing with Summarist everyday
//                 </div>
//             </div>

//             {/* Feature 3 */}
//             <div style={{ textAlign: 'center' }}>
//               <div style={{
//                 width: '80px',
//                 height: '80px',
//                 margin: '0 auto 24px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 <svg width="80" height="80" viewBox="0 0 640 512" fill="#032b41">
//                   <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
//                 </svg>
//               </div>
//               <div style={{ fontSize: '20px', color: '#032b41', lineHeight: '1.6' }}>
//                     <span style={{ fontWeight: '600' }}>Precise recommendations</span> collections curated by experts
//                 </div>
//             </div>
//           </div>

//           {/* CTA Section */}
//           <div style={{
//             textAlign: 'center',
//             maxWidth: '500px',
//             margin: '0 auto'
//           }}>
//             <button
//               onClick={() => router.push('/settings')}
//               style={{
//                 width: '100%',
//                 padding: '16px 48px',
//                 backgroundColor: '#2bd97c',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 fontSize: '18px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 marginBottom: '16px',
//                 transition: 'background-color 0.2s'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#24c471';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = '#2bd97c';
//               }}
//             >
//               Start your free 7-day trial
//             </button>
//             <p style={{
//               fontSize: '14px',
//               color: '#6b757b'
//             }}>
//               Cancel your trial at any time before it ends, and you won't be charged.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Plans Section */}
//       <section style={{
//         padding: '80px 40px',
//         backgroundColor: '#f7faf9'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto'
//         }}>
//           <h2 style={{
//             fontSize: '36px',
//             fontWeight: 'bold',
//             color: '#032b41',
//             textAlign: 'center',
//             marginBottom: '60px'
//           }}>
//             Choose the plan that fits you
//           </h2>

//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//             gap: '32px',
//             maxWidth: '900px',
//             margin: '0 auto'
//           }}>
//             {/* Premium Plan */}
//             <div style={{
//               backgroundColor: 'white',
//               padding: '40px',
//               borderRadius: '12px',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
//               border: '2px solid #2bd97c'
//             }}>
//               <div style={{
//                 backgroundColor: '#2bd97c',
//                 color: 'white',
//                 display: 'inline-block',
//                 padding: '4px 12px',
//                 borderRadius: '4px',
//                 fontSize: '12px',
//                 fontWeight: 'bold',
//                 marginBottom: '16px'
//               }}>
//                 RECOMMENDED
//               </div>
//               <h3 style={{
//                 fontSize: '28px',
//                 fontWeight: 'bold',
//                 color: '#032b41',
//                 marginBottom: '16px'
//               }}>
//                 Premium Plus Yearly
//               </h3>
//               <div style={{ marginBottom: '24px' }}>
//                 <span style={{
//                   fontSize: '48px',
//                   fontWeight: 'bold',
//                   color: '#032b41'
//                 }}>
//                   $99.99
//                 </span>
//                 <span style={{
//                   fontSize: '18px',
//                   color: '#6b757b'
//                 }}>
//                   /year
//                 </span>
//               </div>
//               <button style={{
//                 width: '100%',
//                 padding: '14px',
//                 backgroundColor: '#2bd97c',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 marginBottom: '24px'
//               }}>
//                 Start your free trial
//               </button>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0
//               }}>
//                 <li style={{
//                   padding: '12px 0',
//                   color: '#032b41',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '12px'
//                 }}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   Unlimited access
//                 </li>
//                 <li style={{
//                   padding: '12px 0',
//                   color: '#032b41',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '12px'
//                 }}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   Offline reading
//                 </li>
//                 <li style={{
//                   padding: '12px 0',
//                   color: '#032b41',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '12px'
//                 }}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   No ads
//                 </li>
//               </ul>
//             </div>

//             {/* Premium Monthly */}
//             <div style={{
//               backgroundColor: 'white',
//               padding: '40px',
//               borderRadius: '12px',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
//             }}>
//               <h3 style={{
//                 fontSize: '28px',
//                 fontWeight: 'bold',
//                 color: '#032b41',
//                 marginBottom: '16px',
//                 marginTop: '32px'
//               }}>
//                 Premium Monthly
//               </h3>
//               <div style={{ marginBottom: '24px' }}>
//                 <span style={{
//                   fontSize: '48px',
//                   fontWeight: 'bold',
//                   color: '#032b41'
//                 }}>
//                   $9.99
//                 </span>
//                 <span style={{
//                   fontSize: '18px',
//                   color: '#6b757b'
//                 }}>
//                   /month
//                 </span>
//               </div>
//               <button style={{
//                 width: '100%',
//                 padding: '14px',
//                 backgroundColor: 'white',
//                 color: '#032b41',
//                 border: '2px solid #032b41',
//                 borderRadius: '8px',
//                 fontSize: '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 marginBottom: '24px'
//               }}>
//                 Start your free trial
//               </button>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0
//               }}>
//                 <li style={{
//                   padding: '12px 0',
//                   color: '#032b41',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '12px'
//                 }}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   Unlimited access
//                 </li>
//                 <li style={{
//                   padding: '12px 0',
//                   color: '#032b41',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '12px'
//                 }}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   Offline reading
//                 </li>
//                 <li style={{
//                   padding: '12px 0',
//                   color: '#032b41',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '12px'
//                 }}>
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
//                     <polyline points="20 6 9 17 4 12"></polyline>
//                   </svg>
//                   No ads
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section style={{
//         padding: '80px 40px',
//         backgroundColor: 'white'
//       }}>
//         <div style={{
//           maxWidth: '1000px',
//           margin: '0 auto'
//         }}>
//           {/* FAQ Item 1 */}
//           <div style={{
//             borderBottom: '1px solid #e1e7ea',
//             marginBottom: '0'
//           }}>
//             <button
//               onClick={() => toggleFaq(0)}
//               style={{
//                 width: '100%',
//                 padding: '24px 0',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 cursor: 'pointer',
//                 textAlign: 'left'
//               }}
//             >
//               <h3 style={{
//                 fontSize: '20px',
//                 fontWeight: '600',
//                 color: '#032b41',
//                 margin: 0
//               }}>
//                 How does the free 7-day trial work?
//               </h3>
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#032b41"
//                 strokeWidth="2"
//                 style={{
//                   transform: openFaq === 0 ? 'rotate(180deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.3s'
//                 }}
//               >
//                 <polyline points="6 9 12 15 18 9"></polyline>
//               </svg>
//             </button>
//             {openFaq === 0 && (
//               <div style={{
//                 padding: '0 0 24px 0',
//                 color: '#394547',
//                 fontSize: '16px',
//                 lineHeight: '1.8'
//               }}>
//                 Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
//               </div>
//             )}
//           </div>

//           {/* FAQ Item 2 */}
//           <div style={{
//             borderBottom: '1px solid #e1e7ea',
//             marginBottom: '0'
//           }}>
//             <button
//               onClick={() => toggleFaq(1)}
//               style={{
//                 width: '100%',
//                 padding: '24px 0',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 cursor: 'pointer',
//                 textAlign: 'left'
//               }}
//             >
//               <h3 style={{
//                 fontSize: '20px',
//                 fontWeight: '600',
//                 color: '#032b41',
//                 margin: 0
//               }}>
//                 Can I switch subscriptions from monthly to yearly, or yearly to monthly?
//               </h3>
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#032b41"
//                 strokeWidth="2"
//                 style={{
//                   transform: openFaq === 1 ? 'rotate(180deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.3s'
//                 }}
//               >
//                 <polyline points="6 9 12 15 18 9"></polyline>
//               </svg>
//             </button>
//             {openFaq === 1 && (
//               <div style={{
//                 padding: '0 0 24px 0',
//                 color: '#394547',
//                 fontSize: '16px',
//                 lineHeight: '1.8'
//               }}>
//                 Yes, you can switch between monthly and yearly subscriptions at any time. The change will take effect at the end of your current billing period.
//               </div>
//             )}
//           </div>

//           {/* FAQ Item 3 */}
//           <div style={{
//             borderBottom: '1px solid #e1e7ea',
//             marginBottom: '0'
//           }}>
//             <button
//               onClick={() => toggleFaq(2)}
//               style={{
//                 width: '100%',
//                 padding: '24px 0',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 cursor: 'pointer',
//                 textAlign: 'left'
//               }}
//             >
//               <h3 style={{
//                 fontSize: '20px',
//                 fontWeight: '600',
//                 color: '#032b41',
//                 margin: 0
//               }}>
//                 What's included in the Premium plan?
//               </h3>
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#032b41"
//                 strokeWidth="2"
//                 style={{
//                   transform: openFaq === 2 ? 'rotate(180deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.3s'
//                 }}
//               >
//                 <polyline points="6 9 12 15 18 9"></polyline>
//               </svg>
//             </button>
//             {openFaq === 2 && (
//               <div style={{
//                 padding: '0 0 24px 0',
//                 color: '#394547',
//                 fontSize: '16px',
//                 lineHeight: '1.8'
//               }}>
//                 Premium includes unlimited access to all book summaries, offline reading, no ads, and personalized recommendations based on your reading preferences.
//               </div>
//             )}
//           </div>

//           {/* FAQ Item 4 */}
//           <div style={{
//             borderBottom: '1px solid #e1e7ea',
//             marginBottom: '0'
//           }}>
//             <button
//               onClick={() => toggleFaq(3)}
//               style={{
//                 width: '100%',
//                 padding: '24px 0',
//                 backgroundColor: 'transparent',
//                 border: 'none',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 cursor: 'pointer',
//                 textAlign: 'left'
//               }}
//             >
//               <h3 style={{
//                 fontSize: '20px',
//                 fontWeight: '600',
//                 color: '#032b41',
//                 margin: 0
//               }}>
//                 Can I cancel during my trial or subscription?
//               </h3>
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#032b41"
//                 strokeWidth="2"
//                 style={{
//                   transform: openFaq === 3 ? 'rotate(180deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.3s'
//                 }}
//               >
//                 <polyline points="6 9 12 15 18 9"></polyline>
//               </svg>
//             </button>
//             {openFaq === 3 && (
//               <div style={{
//                 padding: '0 0 24px 0',
//                 color: '#394547',
//                 fontSize: '16px',
//                 lineHeight: '1.8'
//               }}>
//                 Yes, you can cancel your subscription at any time. If you cancel during your trial, you won't be charged. If you cancel after your trial ends, you'll have access until the end of your current billing period.
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer style={{
//         backgroundColor: '#f7faf9',
//         padding: '60px 40px 40px'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           margin: '0 auto'
//         }}>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//             gap: '40px',
//             marginBottom: '60px'
//           }}>
//             {/* Actions Column */}
//             <div>
//               <h4 style={{
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#032b41',
//                 marginBottom: '20px'
//               }}>
//                 Actions
//               </h4>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0
//               }}>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Summarist Magazine
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Cancel Subscription
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Help
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Contact us
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Useful Links Column */}
//             <div>
//               <h4 style={{
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#032b41',
//                 marginBottom: '20px'
//               }}>
//                 Useful Links
//               </h4>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0
//               }}>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Pricing
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Summarist Business
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Gift Cards
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Authors & Publishers
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Company Column */}
//             <div>
//               <h4 style={{
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#032b41',
//                 marginBottom: '20px'
//               }}>
//                 Company
//               </h4>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0
//               }}>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     About
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Careers
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Partners
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Code of Conduct
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Other Column */}
//             <div>
//               <h4 style={{
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#032b41',
//                 marginBottom: '20px'
//               }}>
//                 Other
//               </h4>
//               <ul style={{
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0
//               }}>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Sitemap
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Legal Notice
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li style={{ marginBottom: '12px' }}>
//                   <a href="#" style={{
//                     color: '#394547',
//                     textDecoration: 'none',
//                     fontSize: '14px'
//                   }}>
//                     Privacy Policies
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div style={{
//             textAlign: 'center',
//             paddingTop: '40px',
//             borderTop: '1px solid #e1e7ea'
//           }}>
//             <p style={{
//               fontSize: '14px',
//               color: '#6b757b',
//               margin: 0
//             }}>
//               Copyright © 2023 Summarist.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChoosePlan() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0); 

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#032b41',
        padding: '30px 20px 0px',
        position: 'relative',
        overflow: 'visible',
        width: '100%',
        borderBottomLeftRadius: '20% 35%',
        borderBottomRightRadius: '20% 35%'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Main Heading */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Get unlimited access to many<br />amazing books to read
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: '20px',
            color: 'white',
            marginBottom: '60px',
            opacity: 0.9
          }}>
            Turn ordinary moments into amazing learning opportunities
          </p>

          {/* Illustration - Arch Circle */}
          <div style={{
           width: '370px',
            height: '300px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderTopLeftRadius: '170px',
            borderTopRightRadius: '170px',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            position: 'relative',
            bottom: '-2px'
          }}>
            <Image 
              src="/pricing-top.png" 
              alt="Pricing illustration"
              width={320}
              height={320}
              style={{ objectFit: 'contain', borderRadius: '50%' }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 40px',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            marginBottom: '60px'
          }}>
            {/* Feature 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="80" height="80" viewBox="0 0 1024 1024" fill="#032b41">
                    <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"></path>
                </svg>
              </div>
              <div style={{ fontSize: '20px', color: '#032b41', lineHeight: '1.6' }}>
                    <span style={{ fontWeight: '600' }}>Key ideas in few min</span> with many books to read
                </div>
            </div>

            {/* Feature 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#032b41">
                  <path d="M21 3v2c0 3.866-3.134 7-7 7h-1v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-3c0-3.866 3.134-7 7-7h3zM5.5 2c2.529 0 4.765 1.251 6.124 3.169C10.604 6.51 10 8.185 10 10v1h-.5C5.358 11 2 7.642 2 3.5V2h3.5z"></path>
                </svg>
              </div>
              <div style={{ fontSize: '20px', color: '#032b41', lineHeight: '1.6' }}>
                    <span style={{ fontWeight: '600' }}>3 million</span> people growing with Summarist everyday
                </div>
            </div>

            {/* Feature 3 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="80" height="80" viewBox="0 0 640 512" fill="#032b41">
                  <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
                </svg>
              </div>
              <div style={{ fontSize: '20px', color: '#032b41', lineHeight: '1.6' }}>
                    <span style={{ fontWeight: '600' }}>Precise recommendations</span> collections curated by experts
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section style={{
        padding: '80px 40px',
        backgroundColor: '#f7faf9'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#032b41',
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            Choose the plan that fits you
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Premium Plan */}
            <div style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '2px solid #2bd97c'
            }}>
              <div style={{
                backgroundColor: '#2bd97c',
                color: 'white',
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                RECOMMENDED
              </div>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#032b41',
                marginBottom: '16px'
              }}>
                Premium Plus Yearly
              </h3>
              <div style={{ marginBottom: '24px' }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#032b41'
                }}>
                  $99.99
                </span>
                <span style={{
                  fontSize: '18px',
                  color: '#6b757b'
                }}>
                  /year
                </span>
              </div>
              <button 
                onClick={() => router.push('/settings')}
                style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#2bd97c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '24px'
              }}>
                Start your free trial
              </button>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{
                  padding: '12px 0',
                  color: '#032b41',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Unlimited access
                </li>
                <li style={{
                  padding: '12px 0',
                  color: '#032b41',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Offline reading
                </li>
                <li style={{
                  padding: '12px 0',
                  color: '#032b41',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  No ads
                </li>
              </ul>
            </div>

            {/* Premium Monthly */}
            <div style={{
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#032b41',
                marginBottom: '16px',
                marginTop: '32px'
              }}>
                Premium Monthly
              </h3>
              <div style={{ marginBottom: '24px' }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#032b41'
                }}>
                  $9.99
                </span>
                <span style={{
                  fontSize: '18px',
                  color: '#6b757b'
                }}>
                  /month
                </span>
              </div>
              <button 
                onClick={() => router.push('/settings')}
                style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'white',
                color: '#032b41',
                border: '2px solid #032b41',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '24px'
              }}>
                Start your free trial
              </button>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{
                  padding: '12px 0',
                  color: '#032b41',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Unlimited access
                </li>
                <li style={{
                  padding: '12px 0',
                  color: '#032b41',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Offline reading
                </li>
                <li style={{
                  padding: '12px 0',
                  color: '#032b41',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2bd97c" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  No ads
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{
        padding: '80px 40px',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* FAQ Item 1 */}
          <div style={{
            borderBottom: '1px solid #e1e7ea',
            marginBottom: '0'
          }}>
            <button
              onClick={() => toggleFaq(0)}
              style={{
                width: '100%',
                padding: '24px 0',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#032b41',
                margin: 0
              }}>
                How does the free 7-day trial work?
              </h3>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#032b41"
                strokeWidth="2"
                style={{
                  transform: openFaq === 0 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {openFaq === 0 && (
              <div style={{
                padding: '0 0 24px 0',
                color: '#394547',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
              </div>
            )}
          </div>

          {/* FAQ Item 2 */}
          <div style={{
            borderBottom: '1px solid #e1e7ea',
            marginBottom: '0'
          }}>
            <button
              onClick={() => toggleFaq(1)}
              style={{
                width: '100%',
                padding: '24px 0',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#032b41',
                margin: 0
              }}>
                Can I switch subscriptions from monthly to yearly, or yearly to monthly?
              </h3>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#032b41"
                strokeWidth="2"
                style={{
                  transform: openFaq === 1 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {openFaq === 1 && (
              <div style={{
                padding: '0 0 24px 0',
                color: '#394547',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                Yes, you can switch between monthly and yearly subscriptions at any time. The change will take effect at the end of your current billing period.
              </div>
            )}
          </div>

          {/* FAQ Item 3 */}
          <div style={{
            borderBottom: '1px solid #e1e7ea',
            marginBottom: '0'
          }}>
            <button
              onClick={() => toggleFaq(2)}
              style={{
                width: '100%',
                padding: '24px 0',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#032b41',
                margin: 0
              }}>
                What's included in the Premium plan?
              </h3>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#032b41"
                strokeWidth="2"
                style={{
                  transform: openFaq === 2 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {openFaq === 2 && (
              <div style={{
                padding: '0 0 24px 0',
                color: '#394547',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                Premium includes unlimited access to all book summaries, offline reading, no ads, and personalized recommendations based on your reading preferences.
              </div>
            )}
          </div>

          {/* FAQ Item 4 */}
          <div style={{
            borderBottom: '1px solid #e1e7ea',
            marginBottom: '0'
          }}>
            <button
              onClick={() => toggleFaq(3)}
              style={{
                width: '100%',
                padding: '24px 0',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#032b41',
                margin: 0
              }}>
                Can I cancel during my trial or subscription?
              </h3>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#032b41"
                strokeWidth="2"
                style={{
                  transform: openFaq === 3 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {openFaq === 3 && (
              <div style={{
                padding: '0 0 24px 0',
                color: '#394547',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                Yes, you can cancel your subscription at any time. If you cancel during your trial, you won't be charged. If you cancel after your trial ends, you'll have access until the end of your current billing period.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f7faf9',
        padding: '60px 40px 40px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            {/* Actions Column */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#032b41',
                marginBottom: '20px'
              }}>
                Actions
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Summarist Magazine
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Cancel Subscription
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Help
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Contact us
                  </a>
                </li>
              </ul>
            </div>

            {/* Useful Links Column */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#032b41',
                marginBottom: '20px'
              }}>
                Useful Links
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Pricing
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Summarist Business
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Gift Cards
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Authors & Publishers
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#032b41',
                marginBottom: '20px'
              }}>
                Company
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    About
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Careers
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Partners
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Code of Conduct
                  </a>
                </li>
              </ul>
            </div>

            {/* Other Column */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#032b41',
                marginBottom: '20px'
              }}>
                Other
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Sitemap
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Legal Notice
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Terms of Service
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="#" style={{
                    color: '#394547',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}>
                    Privacy Policies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div style={{
            textAlign: 'center',
            paddingTop: '40px',
            borderTop: '1px solid #e1e7ea'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6b757b',
              margin: 0
            }}>
              Copyright © 2023 Summarist.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom CTA Button */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #e1e7ea',
        padding: '16px 40px',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-80px'
      }}>
        <button
          onClick={() => router.push('/settings')}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '16px 48px',
            backgroundColor: '#2bd97c',
            color: 'white',
            border: 'none',
            borderRadius: '40px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginBottom: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#24c471';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2bd97c';
          }}
        >
          Start your free 7-day trial
        </button>
        <p style={{
          fontSize: '14px',
          color: '#6b757b',
          margin: 0,
          textAlign: 'center'
        }}>
          Cancel your trial at any time before it ends, and you won't be charged.
        </p>
      </div>
    </div>
  );
}