'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ChoosePlan() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0); 
  const [buttonPosition, setButtonPosition] = useState<'sticky' | 'absolute'>('sticky');
  const [absoluteTop, setAbsoluteTop] = useState(0);
  const stickyButtonRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);
  const pricingSectionRef = useRef<HTMLElement>(null);

  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
  const handleScroll = () => {
    if (!stickyButtonRef.current || !faqSectionRef.current || !pricingSectionRef.current) return;

    const faqSection = faqSectionRef.current.getBoundingClientRect();
    const buttonHeight = stickyButtonRef.current.offsetHeight;
    
    // Calculate where the button should stop (right after pricing section with less gap)
    const stopPosition = pricingSectionRef.current.offsetTop + pricingSectionRef.current.offsetHeight -10; // Reduced gap
    
    // When the top of the FAQ section reaches the bottom of the viewport minus button height
    if (faqSection.top <= window.innerHeight - buttonHeight) {
      setButtonPosition('absolute');
      setAbsoluteTop(stopPosition);
    } else {
      setButtonPosition('sticky');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
  
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', position: 'relative' }}>
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
      <section 
        ref={pricingSectionRef}
        style={{
          padding: '80px 40px',
          backgroundColor: 'white'
        }}
      >
        <div style={{
          maxWidth: '800px',
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
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '760px',
            margin: '0 auto'
          }}>
            {/* Premium Plus Yearly */}
            <div 
              onClick={() => setSelectedPlan('yearly')}
              style={{
                backgroundColor: 'white',
                padding: '32px',
                borderRadius: '5px',
                border: selectedPlan === 'yearly' ? '5px solid #2bd97c' : '5px solid #bac8ce',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: selectedPlan === 'yearly' ? '2px solid #032b41' : '2px solid #e1e7ea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 0.3s ease'
              }}>
                {selectedPlan === 'yearly' && (
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#032b41'
                  }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#032b41',
                  marginBottom: '4px'
                }}>
                  Premium Plus Yearly
                </h3>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#032b41',
                  marginBottom: '4px'
                }}>
                  $99.99/year
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#6b757b',
                  margin: 0
                }}>
                  7-day free trial included
                </p>
              </div>
            </div>

            {/* OR Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              margin: '16px auto',
              maxWidth: '300px',
              width: '100%'
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                backgroundColor: '#e1e7ea'
              }} />
              <span style={{
                fontSize: '14px',
                color: '#6b757b',
                fontWeight: '500'
              }}>
                or
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                backgroundColor: '#e1e7ea'
              }} />
            </div>

            {/* Premium Monthly */}
            <div 
              onClick={() => setSelectedPlan('monthly')}
              style={{
                backgroundColor: 'white',
                padding: '32px',
                borderRadius: '8px',
                border: selectedPlan === 'monthly' ? '5px solid #2bd97c' : '5px solid #bac8ce',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: selectedPlan === 'monthly' ? '2px solid #032b41' : '2px solid #e1e7ea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 0.3s ease'
              }}>
                {selectedPlan === 'monthly' && (
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#032b41'
                  }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#032b41',
                  marginBottom: '4px'
                }}>
                  Premium Monthly
                </h3>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#032b41',
                  marginBottom: '4px'
                }}>
                  $9.99/month
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#6b757b',
                  margin: 0
                }}>
                  No trial included
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={faqSectionRef}
        style={{
          padding: '80px 40px',
          backgroundColor: 'white'
        }}
      >
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
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 16 16" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: openFaq === 0 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                  color: '#032b41',
                  fontSize: '24px'
                }}
              >
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
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
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 16 16" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: openFaq === 1 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                  color: '#032b41',
                  fontSize: '24px'
                }}
              >
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
              </svg>
            </button>
            {openFaq === 1 && (
              <div style={{
                padding: '0 0 24px 0',
                color: '#394547',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.
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
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 16 16" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: openFaq === 2 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                  color: '#032b41',
                  fontSize: '24px'
                }}
              >
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
              </svg>
            </button>
            {openFaq === 2 && (
              <div style={{
                padding: '0 0 24px 0',
                color: '#394547',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.
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
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 16 16" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: openFaq === 3 ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                  color: '#032b41',
                  fontSize: '24px'
                }}
              >
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
              </svg>
            </button>
            {openFaq === 3 && (
              <div style={{
                padding: '0 0 24px 0',
                color: '#394547',
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.
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
      <div 
        ref={stickyButtonRef}
        style={{
          position: buttonPosition,
          bottom: buttonPosition === 'sticky' ? 0 : 'auto',
          top: buttonPosition === 'absolute' ? `${absoluteTop}px` : 'auto',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          padding: '8px 40px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'top 0.3s ease-out'
        }}
      >
        <button
          onClick={() => router.push('/settings')}
          style={{
            width: '350px',
            maxWidth: '500px',
            padding: '12px 48px',
            backgroundColor: '#2bd97c',
            color: '#032b41',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '400',
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
          {selectedPlan === 'yearly' ? 'Start your free 7-day trial' : 'Start first month'}
        </button>
        <p style={{
          fontSize: '14px',
          color: '#6b757b',
          margin: 0,
          textAlign: 'center'
        }}>
          {selectedPlan === 'yearly' 
            ? "Cancel your trial at any time before it ends, and you won't be charged."
            : 'No trial included. You will be charged immediately.'}
        </p>
      </div>
    </div>
  );
}