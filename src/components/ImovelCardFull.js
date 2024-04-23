import React from 'react';

const ImovelCardFull = ({ cidade, bairro, imageUrls, videoUrl }) => {

  const renderImageReferences = () => {
    return (
      <div>

        <img
          src={imageUrls && imageUrls.length > 0 ? imageUrls[0] : 'https://source.unsplash.com/random?wallpapers'}
          alt={`Capa do Card`}
          className="w-full h-[180px] object-cover"
        />

        <div className="flex justify-center gap-5 mt-5">
          {/* Exibindo no máximo 3 fotos */}
          {imageUrls && imageUrls.slice(1, 4).map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Imagem ${index}`}
              className="w-1/4 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[360px] rounded-[20px] bg-white max-w-full overflow-hidden flex flex-col items-end justify-start pt-[25px] px-0 pb-0 box-border gap-[39px] leading-normal tracking-normal border-[2px] border-solid border-[#087E8B]">
      {renderImageReferences()}
      <section className="self-stretch flex flex-row items-start justify-between p-[25px] gap-[20px]">
        <div className="flex flex-col items-start">
          <span className="text-[#087E8B] text-lg font-bold">{cidade}</span>
          <span className="text-[#087E8B] text-sm">{bairro}</span>
        </div>
      </section>
    </div>
  );
};

export default ImovelCardFull;
