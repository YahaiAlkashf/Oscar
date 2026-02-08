import { usePage } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingButtons() {
    const [isPulsing, setIsPulsing] = useState(true);
    const [isBouncing, setIsBouncing] = useState(false);
    const [contactInfo, setContactInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPulsing(false);
        }, 20000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBouncing(true);
            setTimeout(() => {
                setIsBouncing(false);
            }, 1500);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchAllData();
    }, []); // Fixed: Added empty dependency array

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const contactRes = await axios.get("/contact-information");
            if (contactRes.data && contactRes.data.length > 0) {
                setContactInfo(contactRes.data[0]); // Get first item if array
            } else {
                setContactInfo({});
            }
        } catch (error) {
            console.error("Error fetching contact info:", error);
        } finally {
            setLoading(false);
        }
    };

    const whatsappNumber = contactInfo?.wathsApp_number || "";

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '30px',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        }}>
            {whatsappNumber && (
                <a
                    href={`https://wa.me/+2${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#25D366',
                        color: 'white',
                        textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.5)',
                        fontSize: '28px',
                        position: 'relative',
                        transform: isBouncing ? 'translateY(-20px)' : 'translateY(0)',
                        transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), background-color 0.3s ease',
                        cursor: 'pointer',
                        animation: isPulsing ? 'pulse 2s infinite' : 'none',
                        animationDelay: isPulsing ? '2s' : 'none'
                    }}
                    className="whatsapp-button"
                >
                    <FaWhatsapp />

                    {isPulsing && (
                        <div style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            borderRadius: '50%',
                            border: '2px solid #25D366',
                            animation: 'pulse-ring 2s infinite',
                            opacity: '0.8'
                        }} />
                    )}
                </a>
            )}

            <style>
                {`
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
                    }
                    70% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
                    }
                    100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
                    }
                }

                @keyframes pulse-ring {
                    0% {
                        transform: scale(0.8);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }

                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0) rotate(0);
                    }
                    10%, 30%, 50%, 70%, 90% {
                        transform: translateX(-5px) rotate(-5deg);
                    }
                    20%, 40%, 60%, 80% {
                        transform: translateX(5px) rotate(5deg);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes glow {
                    0%, 100% {
                        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
                    }
                    50% {
                        box-shadow: 0 4px 30px rgba(37, 211, 102, 0.8), 0 0 40px rgba(37, 211, 102, 0.6);
                    }
                }

                .whatsapp-button:hover {
                    animation: shake 0.8s ease-in-out, float 2s ease-in-out infinite, glow 1.5s infinite;
                    background-color: #1da851;
                    transform: scale(1.1) !important;
                }

                @keyframes welcome-shake {
                    0% { transform: rotate(0); }
                    25% { transform: rotate(15deg); }
                    50% { transform: rotate(-15deg); }
                    75% { transform: rotate(10deg); }
                    100% { transform: rotate(0); }
                }

                .whatsapp-button {
                    animation: welcome-shake 2s ease-in-out 1;
                }

                @media (max-width: 768px) {
                    @keyframes mobile-pulse {
                        0% {
                            transform: scale(1);
                            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
                        }
                        70% {
                            transform: scale(1.03);
                            box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
                        }
                        100% {
                            transform: scale(1);
                            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
                        }
                    }

                    .whatsapp-button {
                        animation: mobile-pulse 2s infinite !important;
                        width: 55px !important;
                        height: 55px !important;
                    }
                }
                `}
            </style>

            {whatsappNumber && (
                <div style={{
                    position: 'absolute',
                    right: '70px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(37, 211, 102, 0.9)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    opacity: '0',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none'
                }} className="whatsapp-label">
                    تواصل معنا على واتساب
                </div>
            )}

            <style>
                {`
                .whatsapp-button:hover + .whatsapp-label {
                    opacity: 1;
                    transform: translateY(-50%) translateX(-10px);
                }

                @media (max-width: 768px) {
                    .whatsapp-label {
                        display: none;
                    }
                }
                `}
            </style>
        </div>
    );
}
