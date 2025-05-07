import React, { useState } from 'react';

const API_KEY = 'AIzaSyB0JQ_c8qC4NGh-QRDRYObGnVxbDC2Z-Ec';

const YouTubeSearch = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const searchYouTube = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${API_KEY}`
      );
      const data = await res.json();
      setVideos(data.items);
    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
    }
  };

  return (
    <div>
      <h2>YouTube Video Search</h2>
      <input
        type="text"
        placeholder="Search YouTube"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchYouTube}>Search</button>

      <div>
        {videos.map((video) => (
          <div key={video.id.videoId} style={{ margin: '20px 0' }}>
            <h4>{video.snippet.title}</h4>
            <iframe
              width="360"
              height="215"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
              title={video.snippet.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSearch;
