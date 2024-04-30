
const Component = () => {
  return (
    <>
      <div className="w-[270px] shrink-0 flex flex-col items-end justify-start pt-[120px] pb-4 pr-0 pl-[13px] box-border relative gap-[11px] text-left text-lg text-black font-inter mq750:pt-[78px] mq750:pb-5 mq750:box-border">
        <div className="!m-[0] absolute top-[0px] left-[0px] flex flex-row items-start justify-start">
          <img
            className="h-[270px] w-[270px] relative"
            alt=""
            src="/group-5.svg"
          />
          <div className="h-[30px] w-[30px] absolute !m-[0] top-[calc(50%_-_15px)] left-[20px] rounded-[50%] bg-white box-border z-[1] border-[0px] border-solid border-black" />
          <img
            className="h-2.5 w-[5px] absolute !m-[0] top-[calc(50%_-_5px)] right-[33px] object-contain z-[2]"
            loading="lazy"
            alt=""
            src="/-icon-nav-arrow-left@2x.png"
          />
        </div>
        <div className="w-[251px] flex flex-col items-start justify-start gap-[137px] text-xs">
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[21px] pl-[13px]">
            <div className="flex-1 flex flex-row items-start justify-between gap-[20px]">
              <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0">
                <img
                  className="w-[5px] h-2.5 relative z-[2]"
                  alt=""
                  src="/-icon-nav-arrow-left-1.svg"
                />
              </div>
              <div className="h-[30px] w-[30px] relative rounded-[50%] bg-white box-border [transform:_rotate(-180deg)] z-[1] border-[0px] border-solid border-black" />
            </div>
          </div>
          <div className="self-stretch relative">Apartamento</div>
        </div>
        <div className="w-[251px] flex flex-col items-start justify-start gap-[3px]">
          <h3 className="m-0 self-stretch relative text-inherit font-bold font-inherit">
            Rua Janguraçu
          </h3>
          <div className="self-stretch relative text-xs whitespace-pre-wrap">{`Parque da Mooca, São Paulo   `}</div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
          <img
            className="w-[202px] h-[31px] relative object-cover"
            loading="lazy"
            alt=""
            src="/screen-shot-20230516-at-1252-1@2x.png"
          />
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-1.5">
            <div className="flex-1 flex flex-row items-start justify-start py-0 pr-5 pl-0">
              <div className="h-[53px] flex-1 relative inline-block shrink-0 [debug_commit:1de1738]">
                <p className="m-0">Aluguel R$ 1.890</p>
                <p className="m-0">
                  <b>Total R$ 2.230</b>
                </p>
              </div>
              <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0 ml-[-54px]">
                <img
                  className="w-[33.3px] h-[30px] relative shrink-0 [debug_commit:1de1738]"
                  loading="lazy"
                  alt=""
                  src="/-icon-heart.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
