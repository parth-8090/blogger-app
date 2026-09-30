import React from 'react';

const MediaRenderer = ({ url, className }) => {
  if (!url) return null;
  const isVideo = url.match(/\.(mp4|webm|ogg)$/i) || url.startsWith("data:video");
  
  if (isVideo) {
    return (
      <video 
        src={url} 
        className={className} 
        controls 
        muted 
        playsInline 
      />
    );
  }
  
  return <img src={url} alt="media content" className={className} />;
};

export default MediaRenderer;
