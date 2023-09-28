import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Feed, Navbar, VideoDetail, SearchFeed, ChannelPage } from './Components';
const App = () => {
  return (
    <div>
        {/* App */}
        <BrowserRouter>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route path="/video/info/:videoId" element={<VideoDetail />} />
            <Route path="/channel/home/:channelId" element={<ChannelPage />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App