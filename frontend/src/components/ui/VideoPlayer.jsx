import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoPlayer = ({
    youtubeId = null,
    localVideo = null,
    title = "Video Demo",
    thumbnail = null,
    className = "",
    autoplay = true
}) => {
    const [showVideo, setShowVideo] = useState(false);

    // Auto-mostrar video después de un pequeño delay para mejor UX
    useEffect(() => {
        if (autoplay && youtubeId) {
            const timer = setTimeout(() => {
                setShowVideo(true);
            }, 800); // Delay de 800ms para mejor experiencia

            return () => clearTimeout(timer);
        }
    }, [autoplay, youtubeId]);

    // Si hay YouTube ID, usar embed de YouTube
    if (youtubeId) {
        return (
            <div className={`relative aspect-video rounded-2xl overflow-hidden ${className}`}>
                {!showVideo ? (
                    // Thumbnail con loading automático
                    <motion.div
                        className="relative w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center cursor-pointer group"
                        onClick={() => setShowVideo(true)}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    >
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={title}
                                className="w-full h-full object-cover"
                                loading="eager"
                                decoding="async"
                            />
                        ) : (
                            <div className="text-center">
                                <div className="text-6xl mb-4">🎥</div>
                                <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
                            </div>
                        )}

                        {/* Indicador de carga automática */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/30"
                        >
                            <motion.div
                                className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-2xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: autoplay ? [0, 360] : 0,
                                }}
                                transition={{
                                    duration: autoplay ? 1 : 0,
                                    repeat: autoplay ? Infinity : 0,
                                    ease: "easeInOut",
                                }}
                            >
                                <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </motion.div>

                            {autoplay && (
                                <motion.div
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Cargando video...
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                ) : (
                    // YouTube embed optimizado para autoplay inmediato
                    <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0&start=0&enablejsapi=1&playsinline=1&loop=0`}
                            title={title}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="eager"
                        />
                    </motion.div>
                )}
            </div>
        );
    }

    // Fallback para video local (solo si es necesario)
    return (
        <div className={`relative aspect-video rounded-2xl overflow-hidden ${className}`}>
            {!isPlaying ? (
                <motion.div
                    className="relative w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎥</div>
                        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
                        <p className="text-sm text-gray-500 mt-2">Haz clic para reproducir</p>
                    </div>

                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                            <svg className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                localVideo && (
                    <video
                        src={localVideo}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                        onLoadStart={() => console.log('Cargando video...')}
                    >
                        Tu navegador no soporta el elemento video.
                    </video>
                )
            )}
        </div>
    );
};

export default VideoPlayer;