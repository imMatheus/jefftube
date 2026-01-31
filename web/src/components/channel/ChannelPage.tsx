import { useState } from 'react';
import { ChannelBanner } from './ChannelBanner';
import { ChannelInfo } from './ChannelInfo';
import { ChannelTabs } from './ChannelTabs';
import { FeaturedVideo } from './FeaturedVideo';
import { VideoCard } from '../ui/VideoCard';
import { VideoCarousel } from '../ui/VideoCarousel';

const channelTabs = [
  { id: 'home', label: 'Home' },
  { id: 'videos', label: 'Videos' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'playlists', label: 'Playlists' },
  { id: 'community', label: 'Community' },
];

const recentVideos = [
  { title: 'Overwatch', duration: '26:50', views: '93,737', uploadedAt: '10 hours ago' },
  { title: 'The Highguard Disaster', duration: '23:02', views: '124,095', uploadedAt: '2 days ago' },
  { title: "I'm going feral for her..", duration: '17:37', views: '93,774', uploadedAt: '4 days ago' },
  { title: 'Twitch is trolling me..', duration: '19:43', views: '165,243', uploadedAt: '8 days ago' },
  { title: 'I hosted a $200k Marvel Rivals tournament', duration: '1:18:29', views: '125,464', uploadedAt: '11 days ago' },
  { title: 'What playing Overwatch feels like rn', duration: '16:24', views: '167,465', uploadedAt: '2 weeks ago' },
];

const classicsVideos = [
  { title: 'Best of supertf 2022', duration: '1:45:23', views: '234,567', uploadedAt: '1 year ago' },
  { title: 'The Silver Experience', duration: '32:15', views: '456,789', uploadedAt: '2 years ago' },
  { title: 'When chat takes control', duration: '28:42', views: '189,234', uploadedAt: '1 year ago' },
  { title: 'Rank 1 to Bronze speedrun', duration: '45:18', views: '567,890', uploadedAt: '2 years ago' },
  { title: 'The ultimate compilations', duration: '52:33', views: '321,654', uploadedAt: '1 year ago' },
  { title: 'Chat creates my loadout', duration: '38:27', views: '245,678', uploadedAt: '2 years ago' },
];

export function ChannelPage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="ml-60 pt-14 min-h-screen bg-(--color-bg-primary)">
      <div className="max-w-[1284px] mx-auto px-6 py-4">
        <ChannelBanner src="https://assets.getkino.com/photos/EFTA00003362-0.png" />

        <ChannelInfo
          name="Jeffery Epstein"
          handle="@jefferyepstein"
          subscribers="392K"
          videoCount={628}
          description="Official Jeffery Epstein youtube channel."
          avatar="https://assets.getkino.com/photos/EFTA00003692-0.png"
          links={[
            { label: 'twitch.tv/jefferyepstein', url: 'https://twitch.tv/jefferyepstein' },
            { label: 'twitter.com/jefferyepstein', url: 'https://twitter.com/jefferyepstein' },
            { label: 'discord.gg/jefferyepstein', url: 'https://discord.gg/jefferyepstein' },
          ]}
          verified
        />

        <ChannelTabs
          tabs={channelTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'home' && (
          <div className="py-6 space-y-8">
            {/* Featured Video */}
            <FeaturedVideo
              title="WORST of supertf 2023!"
              channel="supertf"
              duration="1:22:13"
              views="1M"
              uploadedAt="2 years ago"
              description="That time of year again. Clips channel: https://www.youtube.com/channel/UCfLUpsmJ3v99NEbLTE9Ozng VOD channel (If you can't catch the streams): https://www.youtube.com/c/supertfVODs Socials:..."
              verified
            />

            <div className="border-t border-(--color-border-light)" />

            {/* Videos Section */}
            <VideoCarousel title="Videos">
              {recentVideos.map((video, index) => (
                <VideoCard
                  key={index}
                  title={video.title}
                  duration={video.duration}
                  views={video.views}
                  uploadedAt={video.uploadedAt}
                  size="md"
                />
              ))}
            </VideoCarousel>

            {/* Playlist Section */}
            <VideoCarousel
              title="supertf classics"
              showPlayAll
              subtitle="Best supertf videos"
            >
              {classicsVideos.map((video, index) => (
                <VideoCard
                  key={index}
                  title={video.title}
                  duration={video.duration}
                  views={video.views}
                  uploadedAt={video.uploadedAt}
                  size="md"
                />
              ))}
            </VideoCarousel>
          </div>
        )}
      </div>
    </main>
  );
}
