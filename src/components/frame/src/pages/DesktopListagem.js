import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import Component from "../components/Component";


const DesktopListagem = () => {
  return (
    <>
      <FrameComponent1 />
      <div className="w-full relative bg-sky-100 overflow-hidden flex flex-col items-center justify-start pt-10 pb-[937px] pr-[21px] pl-5 box-border gap-[20px] leading-[normal] tracking-[normal]">
        <section className="w-[1171px] flex flex-col items-end justify-start gap-[79px] max-w-full lg:gap-[39px] mq750:gap-[20px]">
          <div className="self-stretch flex flex-col items-end justify-start gap-[40px] max-w-full mq750:gap-[20px]">
            <FrameComponent />
          </div>
          <div className="w-[1170px] overflow-x-auto flex flex-row items-start justify-start gap-[30px] max-w-full">
            <Component />
            <Component />
            <Component />
            <Component />
          </div>
        </section>
      </div>
    </>
  );
};

export default DesktopListagem;
