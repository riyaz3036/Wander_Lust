import { memo } from 'react'
import reg_img1 from '../../../assets/images/reg_img1.jpg'
import reg_img2 from '../../../assets/images/reg_img2.jpg'
import reg_img3 from '../../../assets/images/reg_img3.jpg'
import reg_img4 from '../../../assets/images/reg_img4.jpg'
import reg_img5 from '../../../assets/images/reg_img5.jpg'
import reg_img6 from '../../../assets/images/reg_img6.jpg'
import reg_img7 from '../../../assets/images/reg_img7.jpg'
import reg_img8 from '../../../assets/images/reg_img8.jpg'
import reg_img9 from '../../../assets/images/reg_img9.jpg'
import BlurImage from '../../common/BlurImage/BlurImage'


const imageImports2: Record<string, string> = {
  [reg_img1]: "L36RrwD*00^+00%2~pD%?dV]jYWA",
  [reg_img2]: "L#Ii98xuWYoz%%ofWBj]9GWBV@WB",
  [reg_img3]: "L$D^7oM|IpaePEs.s:aekZWraeof",
  [reg_img4]: "L$NwA$t7WVRP_Nt7ofR*s:M{Rjxu",
  [reg_img5]: "LIC7QbIT00?c~qRj9Ft7%MM{Iot7",
  [reg_img6]: "LVO:|k%gW=WCyZNHWBxto~aeoLkC",
  [reg_img7]: "LpEE1Cn%bxR*X=f,e.ogNfofV?oK",
  [reg_img8]: "LuG+:tR*awxZT#RjWAWBksRnxuay",
  [reg_img9]: "L9G8_=8wX:Fg00~q4nNf00Io%1Vr"
};

type ImageData = {
  src: string;
  blurhash: string | null;
};

const LoginImages=()=>{
   
    return(
        <div className="flex items-center justify-center items-start pl-[20px]">
            <div className="grid grid-cols-3 gap-2 w-full">
                <div className="flex flex-col gap-[10px]">
                    <div className="w-full h-[400px] relative">
                        <BlurImage src={reg_img1} blurhash={imageImports2[reg_img1]} />
                    </div>
                    <div className="w-full h-[100px] relative">
                        <BlurImage src={reg_img2} blurhash={imageImports2[reg_img2]} />
                    </div>
                    <div className="w-full h-[100px] relative">
                        <BlurImage src={reg_img3} blurhash={imageImports2[reg_img3]} />
                    </div>
                </div>
                
                <div className="flex flex-col gap-[10px]">
                    <div className="w-full h-[140px] relative">
                        <BlurImage src={reg_img4} blurhash={imageImports2[reg_img4]} />
                    </div>
                    <div className="w-full h-[100px] relative">
                        <BlurImage src={reg_img5} blurhash={imageImports2[reg_img5]} />
                    </div>
                    <div className="w-full h-[150px] relative">
                        <BlurImage src={reg_img6} blurhash={imageImports2[reg_img6]} />
                    </div>
                    <div className="w-full h-[100px] relative">
                        <BlurImage src={reg_img9} blurhash={imageImports2[reg_img9]} />
                    </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="w-full h-[320px] relative">
                        <BlurImage src={reg_img7} blurhash={imageImports2[reg_img7]} />
                    </div>
                    <div className="w-full h-[140px] relative">
                        <BlurImage src={reg_img8} blurhash={imageImports2[reg_img8]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(LoginImages);