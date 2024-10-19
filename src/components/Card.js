const Card = ({image,title}) => {
  return (
    <div className="bg-gray-200 w-[250px] h-[280px] flex flex-col items-center justify-center m-2">
      <div className="w-[150px] h-[200px]">
        <img className = "w-full h-full object-cover" src = {image} alt = "Product image"/>
      </div>
      <div className="">{title}</div>
    </div>
  );
};

export default Card;
