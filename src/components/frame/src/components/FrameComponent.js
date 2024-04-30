import { Button } from "@mui/material";

const FrameComponent = () => {
  return (
    <div className="self-stretch flex flex-row items-start justify-start max-w-full text-left text-base text-gray font-inter">
      <img
        className="w-[570px] relative max-h-full max-w-full"
        loading="lazy"
        alt=""
        src="/group-21.svg"
      />
      <div className="flex-1 flex flex-col items-end justify-start gap-[20px] max-w-full ml-[-558px]">
        <div className="w-[570px] flex flex-row flex-wrap items-start justify-start gap-[30px] max-w-full">
          <div className="flex flex-col items-start justify-start gap-[30px]">
            <img
              className="w-[270px] h-[270px] relative"
              loading="lazy"
              alt=""
              src="/group-24.svg"
            />
            <img
              className="w-[270px] h-[270px] relative"
              loading="lazy"
              alt=""
              src="/group-24.svg"
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[30px] min-w-[175px]">
            <img
              className="w-[270px] h-[270px] relative"
              loading="lazy"
              alt=""
              src="/group-24.svg"
            />
            <div className="self-stretch flex flex-row items-start justify-start pt-[119px] px-[70px] pb-[121px] relative mq450:pl-5 mq450:pr-5 mq450:box-border">
              <img
                className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full"
                loading="lazy"
                alt=""
                src="/group-24.svg"
              />
              <Button
                className="h-[30px] flex-1 z-[1]"
                disableElevation={true}
                variant="contained"
                sx={{
                  textTransform: "none",
                  color: "#000",
                  fontSize: "12",
                  background: "#d9d9d9",
                  borderRadius: "10px",
                  "&:hover": { background: "#d9d9d9" },
                  height: 30,
                }}
              >
                Veja mais fotos
              </Button>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-end py-0 pr-5 pl-0 box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[77px] max-w-full lg:gap-[38px] mq750:gap-[19px] mq1050:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start pt-4 px-0 pb-0 box-border max-w-full mq750:min-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[42px] max-w-full mq750:gap-[21px]">
                <div className="self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full">
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[7px] box-border max-w-full">
                    <div className="flex-1 flex flex-col items-start justify-start gap-[10px] max-w-full">
                      <div className="relative inline-block min-w-[112px]">{`Imóvel AP0012 `}</div>
                      <h1 className="m-0 self-stretch relative text-5xl font-bold font-inherit text-black mq450:text-lgi">
                        Apartamento para alugar com 30m² em Mooca, 1 quarto
                      </h1>
                    </div>
                  </div>
                  <div className="w-[672px] h-[188px] flex flex-col items-start justify-start gap-[2px] max-w-full text-black">
                    <div className="flex flex-row items-start justify-start py-0 px-[7px]">
                      <div className="relative">
                        <span className="[text-decoration:underline]">
                          Rua Janguraçu
                        </span>{" "}
                        - Mooca, São Paulo - SP
                      </div>
                    </div>
                    <img
                      className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                      loading="lazy"
                      alt=""
                      src="/screen-shot-20230517-at-1119-1@2x.png"
                    />
                  </div>
                </div>
                <div className="w-[664px] flex flex-row items-start justify-start py-0 px-1.5 box-border max-w-full text-black">
                  <div className="flex-1 flex flex-col items-start justify-start min-h-[357px] max-w-full">
                    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full">
                      <div className="h-[357px] flex-1 relative leading-[24px] inline-block max-w-full">
                        <p className="m-0">
                          Imóvel aconchegante para alugar com 1 quarto, sendo 1
                          suíte, e 1 banheiro no total. é ideal para quem
                          procura conforto e comodidade O condomínio fica
                          localizado em Rua São Borja no bairro Cidade Vargas em
                          São Paulo. Está bem localizado, próximo a pontos de
                          interesse de Cidade Vargas, tais como Terminal
                          Jabaquara, Estação Jabaquara, Hospital São Luiz
                          Unidade Jabaquara, Escola Nossa Senhora das Graças,
                          EMEI Casimiro de Abreu e Mello Laboratório Médico De
                          Análises.
                        </p>
                        <p className="m-0">&nbsp;</p>
                        <p className="m-0">
                          <b>Descrição do proprietário</b>
                        </p>
                        <p className="m-0">&nbsp;</p>
                        <p className="m-0">
                          Kitnet mobiliada próximo metrô Jabaquara (5 minutos) .
                          Acompanha cama Box casal, guarda-roupas, fogão
                          cocktop, pia cozinha com armário, banheiro equipado ,
                          chuveiro elétrico, frigobar, mesa , porta vidro no
                          banheiro, Rua tranquila e arborizada, próximo a
                          comércio em geral. Câmeras de monitoramento, cerca
                          elétrica, interfone que toca no seu celular ,
                          segurança total.
                        </p>
                      </div>
                    </div>
                    <b className="relative z-[1] mt-[-247.3px]">
                      Imóveis similares
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[373px] flex flex-col items-start justify-start min-w-[373px] max-w-full mq750:min-w-full mq1050:flex-1">
              <div className="self-stretch h-[468px] relative">
                <img
                  className="absolute top-[0px] left-[0px] w-full h-full object-cover"
                  alt=""
                  src="/mask-group@2x.png"
                />
                <img
                  className="absolute top-[318px] left-[268px] w-[52px] h-[50px] overflow-hidden z-[1]"
                  loading="lazy"
                  alt=""
                  src="/frame.svg"
                />
                <img
                  className="absolute top-[393px] left-[268px] w-[52px] h-[50px] overflow-hidden z-[1]"
                  alt=""
                  src="/frame.svg"
                />
              </div>
              <img
                className="self-stretch h-[106px] relative max-w-full overflow-hidden shrink-0 object-cover z-[1]"
                alt=""
                src="/mask-group-1@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;