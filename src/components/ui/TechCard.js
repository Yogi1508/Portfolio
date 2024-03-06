const TechCard = ({ title, itemList }) => {
  // console.log(itemList);
  return (
    <>
      <div className="flex-1 flex flex-col gap-4 bg-cardPrimary p-4 rounded-md shadow-lg bg-blue-gray-900">
        <div className="text-primary font-medium text-lg tracking-wider">
          {title}
        </div>
        <div className="flex flex-wrap gap-2">
          {itemList.map((item, index) => {
            return (
              <div
                key={index}
                className={"rounded-md bg-body text-xs text-primary p-2 border"}
                style={{ borderColor: item.Color }}
              >
                {item.altName}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TechCard;
