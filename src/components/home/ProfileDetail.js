const ProfileDetail = ({ profileData, socialLink }) => {
  return (
    <>
      <div className="text-3xl flex-1 flex-col font-bold text-highlight">
        {profileData.name}
        <div className="text-sm font-thin flex justify-between items-center">
          <a href={socialLink.link} target="_blank" rel="noopener noreferrer">
            {socialLink.text}
          </a>
        </div>
      </div>
    </>
  );
};

export default ProfileDetail;
