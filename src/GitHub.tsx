import { FiSearch, FiMapPin, FiLink, FiTwitter, FiHome } from 'react-icons/fi';
import { useState } from 'react';

const GitHub = () => {
  const [username, setUsername] = useState<any>('');
  const [userData, setUserData] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const searchUser = () => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
       if (data.message === "Not Found") {
        setNotFound(true);
      } else {
        setNotFound(false);
        setUserData(data);
      }
      });
  };
  const formatJoinedDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `Joined ${day} ${month} ${year}`;
  };
  return (
    <div className='bg-[#F5F7FF] w-full h-screen flex flex-col items-center justify-center !py-10 !px-4 gap-6 text-[#2b3442] font-mono'>
      <div className='w-full max-w-[800px] flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[#4B699B]'>devfinder</h1>
      </div>
      {
        notFound ? (
            <h3 className='text-red-500 font-semibold'>User not found</h3>
        ) : null
      }
      <div className='bg-white w-full max-w-[800px] h-[70px] rounded-xl shadow-md !px-6 flex items-center gap-4'>
        <FiSearch className="text-blue-500 text-3xl" />
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type='text'
          placeholder='Search GitHub Username...'
          className='flex-1 outline-none bg-transparent text-base placeholder:text-[#4b6a9b] text-[20px]'
        />
        <button onClick={() => searchUser()} className='bg-blue-500 text-white font-semibold !px-5 !py-2 rounded-lg hover:bg-blue-600 transition-all'>
          Search
        </button>
      </div>

      <div className='w-full max-w-[800px] bg-white rounded-xl shadow-md !p-6 flex flex-col gap-4 md:flex-row md:gap-8'>
        {userData == null ? (
          <div className="flex w-full gap-[20px]">
            <img
              src='https://avatars.githubusercontent.com/u/583231?v=4'
              alt='Octocat'
              className='w-[120px] h-[120px] rounded-full'
            />
            <div className='flex-1 flex flex-col gap-2'>
              <div className='flex justify-between items-center flex-wrap'>
                <h2 className='text-2xl font-bold'>The Octocat</h2>
                <p className='text-sm text-[#697c9a]'>Joined 25 Jan 2011</p>
              </div>
              <a href='https://github.com/octocat' className='text-blue-500 text-base !mb-2'>@octocat</a>
              <p className='text-[#697c9a]'>This profile has no bio</p>
              <div className='bg-[#F5F7FF] rounded-lg !p-4 flex justify-around text-center !mt-4'>
                <div>
                  <p className='text-sm text-[#697c9a]'>Repos</p>
                  <p className='font-bold text-xl'>8</p>
                </div>
                <div>
                  <p className='text-sm text-[#697c9a]'>Followers</p>
                  <p className='font-bold text-xl'>3938</p>
                </div>
                <div>
                  <p className='text-sm text-[#697c9a]'>Following</p>
                  <p className='font-bold text-xl'>9</p>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 !mt-4 text-sm text-[#4b6a9b]'>
                <div className='flex items-center gap-2'>
                  <FiMapPin /> San Francisco
                </div>
                <div className='flex items-center gap-2'>
                  <FiTwitter /> Not available
                </div>
                <div className='flex items-center gap-2'>
                  <FiLink /> <a href='https://github.blog'>github.blog</a>
                </div>
                <div className='flex items-center gap-2'>
                  <FiHome /> @github
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full gap-[20px]">
            <img
              src={userData.avatar_url}
              alt='User Avatar'
              className='w-[120px] h-[120px] rounded-full'
            />
            <div className='flex-1 flex flex-col gap-2'>
              <div className='flex justify-between items-center flex-wrap'>
                <h2 className='text-2xl font-bold'>{userData.name}</h2>
                <p className='text-sm text-[#697c9a]'>{formatJoinedDate(userData.created_at)}</p>
              </div>
              <a href={`https://github.com/${userData.login}`} className='text-blue-500 text-base !mb-2'>@{userData.login}</a>
              <p className='text-[#697c9a]'>{userData.bio || "This profile has no bio"}</p>
              <div className='bg-[#F5F7FF] rounded-lg !p-4 flex justify-around text-center !mt-4'>
                <div>
                  <p className='text-sm text-[#697c9a]'>Repos</p>
                  <p className='font-bold text-xl'>{userData.public_repos}</p>
                </div>
                <div>
                  <p className='text-sm text-[#697c9a]'>Followers</p>
                  <p className='font-bold text-xl'>{userData.followers}</p>
                </div>
                <div>
                  <p className='text-sm text-[#697c9a]'>Following</p>
                  <p className='font-bold text-xl'>{userData.following}</p>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 !mt-4 text-sm text-[#4b6a9b]'>
                <div className='flex items-center gap-2'>
                  <FiMapPin /> {userData.location || "Not available"}
                </div>
                <div className='flex items-center gap-2'>
                  <FiTwitter /> {userData.twitter_username || "Not available"}
                </div>
                <div className='flex items-center gap-2'>
                  <FiLink /> <a href={userData.location}>{userData.company || "Not available"}</a>
                </div>
                <div className='flex items-center gap-2'>
                  <FiHome /> {userData.company || "Not available"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHub;
