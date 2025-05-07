// src/pages/Player.jsx
export default function Player() {
    const videoURL = "https://www.w3schools.com/html/mov_bbb.mp4"; // replace with your Firebase-hosted video
  
    return (
      <div>
        <video width="640" controls>
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <a href={videoURL} download>
          <button>Download Movie</button>
        </a>
      </div>
    );
  }
  