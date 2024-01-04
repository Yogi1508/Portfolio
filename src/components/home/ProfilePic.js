const ProfilePic = ({ profileData }) => {
  return (
    <img
      className="flex object-cover border-4 border-white rounded-full shadow-md"
      src={profileData.userImage}
      alt={profileData.name}
      width={250}
      height={400}
    />
  );
};

export default ProfilePic;
