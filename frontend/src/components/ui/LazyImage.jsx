import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({
    src,
    alt,
    className = '',
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhcmdhbmRvLi4uPC90ZXh0Pjwvc3ZnPg==',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
            {/* Placeholder */}
            <motion.img
                src={placeholder}
                alt=""
                className="absolute inset-0 w-full h-full object-cover filter blur-sm"
                animate={{ opacity: isLoaded ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Imagen real */}
            {isInView && (
                <motion.img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    onLoad={() => setIsLoaded(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                    decoding="async"
                />
            )}
        </div>
    );
};

export default LazyImage;